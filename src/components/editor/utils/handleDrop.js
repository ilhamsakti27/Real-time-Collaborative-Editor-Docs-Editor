/* eslint-disable  */
import { uploadMedia } from '../utils/upload'

// const host = 'http://localhost:1234'
const host = 'https://editorhocus.oriens.my.id'

export const handleImageDrop = (view, event, file, documentId) => {
    const _URL = window.URL || window.webkitURL
    const img = new Image()
    img.src = _URL.createObjectURL(file)
    const { schema } = view.state
    console.log('event: ', event.clientX)

    const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
    const loadingNode = schema.nodes.loading.create({ content: 'Image Uploading... ' })
    const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)
    view.dispatch(loadingTransaction)

    img.onload = function () {
        if (this.width > 5000 || this.height > 5000) {
            window.alert('Your images need to be less than 5000 pixels in height and width.')
        } else {
            uploadMedia(file, documentId).then(response => {
                console.log('done')

                const imgUri = response.data.data.destination.slice('assets/'.length)
                const fileName = response.data.data.originalname
                const url = `${host}/${imgUri}/${fileName}`

                const node = schema.nodes.image.create({ src: url }) // creates the image element
                const transaction = view.state.tr.insert(coordinates.pos, node) // places it in the correct position

                view.dispatch(transaction)
                deleteLoadingNode(view, coordinates)
                return
            }).catch(error => {
                console.log(error)
                if (error) {
                    window.alert('There was a problem uploading your image, please try again.')
                }
            })
        }
    }
}

export const handleVideoDrop = (view, event, file, documentId) => {
    console.log('video: ', file)
    console.log('uploading....')
    const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
    const { schema } = view.state
    const loadingNode = schema.nodes.loading.create({ content: 'Video Uploading... ' })
    const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)
    view.dispatch(loadingTransaction)
    uploadMedia(file, documentId).then(response => {

        const path = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const url = `${host}/${path}/${fileName}`
        console.log('uploaded: ', url)
        const videoNode = schema.nodes.video.create({ src: url })
        const replaceTransaction = view.state.tr.insert(coordinates.pos, videoNode)

        view.dispatch(replaceTransaction)
        deleteLoadingNode(view, coordinates)

        return
    }).catch(error => {
        console.log(error)
    })
}

const deleteLoadingNode = (view, coordinates) => {
    const type = view.state.schema.nodes['loading'];
    // console.log(type)
    const $pos = view.state.tr.selection.$anchor;
    console.log($pos.pos)
    let depth = $pos.depth
    const node = $pos.node(depth);
    // console.log(node)
    const from = $pos.before(depth);
    const to = $pos.after(depth);
    console.log(coordinates)
    if ($pos.pos !== coordinates.pos) {
        view.dispatch(view.state.tr.delete(coordinates.pos + 1, coordinates.pos + 2).scrollIntoView())
    } else {
        console.log(from)
        console.log(to)
        view.dispatch(view.state.tr.delete(from + 3, to + 3).scrollIntoView())
    }


    return false;
};