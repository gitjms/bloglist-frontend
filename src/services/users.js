import axios from 'axios'

const baseUrl = '/api/users'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const create = async (newObject) => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { getAll, create, remove }
