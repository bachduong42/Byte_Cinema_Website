import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8081/api/v1/',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export default httpRequest; 