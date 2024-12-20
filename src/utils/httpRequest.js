import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    withCredentials: true
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options)
    return response.data
}

export const post = async (path, body = {}, options = {}) => {
    const response = await httpRequest.post(path, body, options);
    return response.data;
}

export const put = async (path, body = {}, options = {}) => {
    const response = await httpRequest.put(path, body, options);
    return response.data;
};

export const patch = async (path, body = {}, options = {}) => {
  const response = await httpRequest.patch(path, body, options);
  return response.data;
};

export const DELETE = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options)
    return response.data
}
export default httpRequest; 