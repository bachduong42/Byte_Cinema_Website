import httpRequest from "../utils/httpRequest";

const addMovieRequest = async (bearer, data) => {
    try {
        const res = await httpRequest.post('movies', data, {
            headers: {
                'Authorization': `Bearer ${bearer}`,
            }
        });
        console.log('Movie: ', res.data);
        return res.data;
    } catch (error) {
        console.log('Add Movie error: ', error);
        throw error;
    }
}

export { addMovieRequest }