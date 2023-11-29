import axios from 'axios'

const host = process.env.VUE_APP_EDITOR_BACKEND

export const fetchOpenGraphData = async url => {
  try {
    const response = await axios.get(`${host}/scrape?url=${url}`)

    return response
  } catch (error) {
    return error
  }
}
