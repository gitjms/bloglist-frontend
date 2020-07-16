import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request
  return response.data
}

const update = async (newObject) => {
  console.log(newObject)
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  const response = await request
  return response.data
}

const addComment = async (newObject) => {
  const request = axios.post(`${baseUrl}/${newObject.id}/comments`, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export default { getAll, create, update, addComment, remove, setToken }
