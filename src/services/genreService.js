import * as httpRequest from '../utils/httpRequest';

const updateGenreRequest = async (name, description, id) => {
    try {
        const response = await httpRequest.put(`/genres/${id}`, {
            name,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
const addGenreRequest = async (name, description) => {
    try {
        const response = await httpRequest.post("/genres", {
            name,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
const getGenreByID = async (id) => {
    try {
        const response = await httpRequest.get(`/genres/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
export { updateGenreRequest, addGenreRequest, getGenreByID }