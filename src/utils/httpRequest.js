import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8081/api/v1/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }

});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}

export const post = async (path, body = {}, options = {}) => {
    const response = await request.post(path, body, options);
    return response.data;
}

export const DELETE = async (path, options = {}) => {
    const response = await request.delete(path, options)
    return response.data
}
export default httpRequest; 