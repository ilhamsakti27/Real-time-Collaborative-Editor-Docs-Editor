/* eslint-disable  */
import { uploadMedia } from '../utils/upload'

// const host = 'http://localhost:1234'
const host = 'https://editorhocus.oriens.my.id'

export const handleImageDrop = (view, event, file, documentId) => {
    console.log('image: ', file)
    console.log('uploading....')
    const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
    const { schema } = view.state
    uploadMedia(file, documentId, (progressEvent) => {
        const uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        const loadingNode = schema.nodes.loading.create({ content: `Image Uploading... ${progressEvent.loaded}/${progressEvent.total} (${uploadProgress}%)` })
        const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)
        view.dispatch(loadingTransaction)

        const $pos = view.state.tr.selection.$anchor;
        console.log($pos.pos)
        let depth = $pos.depth
        const node = $pos.node(depth);
        const from = $pos.before(depth);
        const to = $pos.after(depth);

        // view.dispatch(view.state.tr.delete(from, to).scrollIntoView())

    }).then(response => {
        const path = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const url = `${host}/${path}/${fileName}`
        console.log('uploaded: ', url)
        const imageNode = schema.nodes.image.create({ src: url })
        const replaceTransaction = view.state.tr.insert(coordinates.pos, imageNode)

        view.dispatch(replaceTransaction)
        deleteLoadingNode(view, coordinates, 'image')

        return
    }).catch(error => {
        console.log(error)
    })



}

export const handleVideoDrop = (view, event, file, documentId) => {
    console.log('video: ', file)
    console.log('uploading....')
    const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
    const { schema } = view.state
    uploadMedia(file, documentId, (progressEvent) => {
        const uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        const loadingNode = schema.nodes.loading.create({ content: `Video Uploading... ${progressEvent.loaded}/${progressEvent.total} (${uploadProgress}%)` })
        const loadingTransaction = view.state.tr.insert(coordinates.pos, loadingNode)
        view.dispatch(loadingTransaction)

        const $pos = view.state.tr.selection.$anchor;
        console.log($pos.pos)
        let depth = $pos.depth
        const node = $pos.node(depth);
        const from = $pos.before(depth);
        const to = $pos.after(depth);

        view.dispatch(view.state.tr.delete(from, to).scrollIntoView())

    }).then(response => {
        const path = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const url = `${host}/${path}/${fileName}`
        console.log('uploaded: ', url)
        const videoNode = schema.nodes.video.create({ src: url })
        const replaceTransaction = view.state.tr.insert(coordinates.pos, videoNode)

        view.dispatch(replaceTransaction)
        deleteLoadingNode(view, coordinates, 'video')

        return
    }).catch(error => {
        console.log(error)
    })
}

const deleteLoadingNode = (view, coordinates, media) => {
    const type = view.state.schema.nodes['loading'];
    const $pos = view.state.tr.selection.$anchor;
    console.log($pos.pos)
    let depth = $pos.depth
    const node = $pos.node(depth);
    const from = $pos.before(depth);
    const to = $pos.after(depth);
    console.log(coordinates)
    if ($pos.pos !== coordinates.pos) {
        view.dispatch(view.state.tr.delete(coordinates.pos + 1, coordinates.pos + 2).scrollIntoView())
    } else {
        console.log(from)
        console.log(to)
        if (media === 'video') view.dispatch(view.state.tr.delete(from, to).scrollIntoView())
        if (media === 'image') view.dispatch(view.state.tr.delete(from + 3, to + 3).scrollIntoView())
    }


    return false;
};