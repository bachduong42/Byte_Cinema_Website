import axios from "axios";
const httpRequest = axios.create({
  baseURL:  'http://localhost:8081',
})

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}

export const post = async (path, body={}, options = {}) => {
  const response = await httpRequest.post(path, body, options);
  console.log(response)
  return response.data;
}

export const DELETE = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options)
  return response.data
}

export default httpRequest