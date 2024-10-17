import httpRequest from '../utils/httpRequest';

const getListMovie = async () => {
    try {
        const res = await httpRequest.get('movies');
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
};
export { getListMovie }