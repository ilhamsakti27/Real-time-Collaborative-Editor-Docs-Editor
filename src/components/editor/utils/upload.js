import axios from 'axios'
import FormData from 'form-data'

const host = process.env.VUE_APP_EDITOR_BACKEND

export const uploadMedia = (file, documentId, progressEvent) => {
  const data = new FormData()
  data.append('document', documentId)
  data.append('file', file)
  const uri = `${host}/uploadEditor`

  return axios.post(uri, data, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressEvent,
  })
}
