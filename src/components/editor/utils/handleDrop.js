import { uploadMedia } from './upload'

const host = process.env.VUE_APP_EDITOR_BACKEND

const deleteLoadingNode = (view, coordinates) => {
  const $pos = view.state.tr.selection.$anchor
  const { depth } = $pos
  const from = $pos.before(depth)
  const to = $pos.after(depth)
  if ($pos.pos !== coordinates.pos) { view.dispatch(view.state.tr.delete(coordinates.pos + 1, coordinates.pos + 2).scrollIntoView()) } else { view.dispatch(view.state.tr.delete(from, to).scrollIntoView()) }

  return false
}

export const handleImageDrop = (view, event, file, documentId) => {
  const uri = window.URL || window.webkitURL
  const img = new Image()
  img.src = uri.createObjectURL(file)
  const { schema } = view.state
  const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
  const $pos = view.state.tr.selection.$anchor
  const { depth } = $pos
  const from = $pos.before(depth)
  const to = $pos.after(depth)

  img.onload = () => {
    if ($pos.pos === coordinates.pos) {
      uploadMedia(file, documentId, progressEvent => {
        const uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100), 10)
        const loadingNode = schema.nodes.loading.create({ content: `Image Uploading... ${progressEvent.loaded}/${progressEvent.total} (${uploadProgress}%)` })
        const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)

        view.dispatch(loadingTransaction)
        view.dispatch(view.state.tr.delete(from, to).scrollIntoView())
      }).then(response => {
        const imgUri = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const url = `${host}/${imgUri}/${fileName}`

        const node = schema.nodes.image.create({ src: url }) // creates the image element
        const transaction = view.state.tr.insert(coordinates.pos, node) // places it in the correct position

        view.dispatch(transaction)

        deleteLoadingNode(view, coordinates)
      }).catch(error => {
        console.log(error)
        if (error) {
          alert('There was a problem uploading your image, please try again.')
        }
      })
    } else {
      alert('Drop media dalam inline block !')
    }
  }
}

export const handleVideoDrop = (view, event, file, documentId) => {
  const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
  const { schema } = view.state
  const $pos = view.state.tr.selection.$anchor
  const { depth } = $pos
  const from = $pos.before(depth)
  const to = $pos.after(depth)

  if ($pos.pos === coordinates.pos) {
    uploadMedia(file, documentId, progressEvent => {
      const uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100), 10)
      const loadingNode = schema.nodes.loading.create({ content: `Video Uploading... ${progressEvent.loaded}/${progressEvent.total} (${uploadProgress}%)` })
      const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)

      view.dispatch(loadingTransaction)
      view.dispatch(view.state.tr.delete(from, to).scrollIntoView())
    }).then(response => {
      const path = response.data.data.destination.slice('assets/'.length)
      const fileName = response.data.data.originalname
      const url = `${host}/${path}/${fileName}`
      const videoNode = schema.nodes.video.create({ src: url })
      const replaceTransaction = view.state.tr.insert(coordinates.pos, videoNode)

      view.dispatch(replaceTransaction)

      deleteLoadingNode(view, coordinates)
    }).catch(error => {
      console.log(error)
    })
  } else {
    alert('Drop media dalam inline block !')
  }
}
