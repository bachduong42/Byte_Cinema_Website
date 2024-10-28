import httpRequest from "../utils/httpRequest";

const updateMovieRequest = async (bearer, data, id) => {
    try {
        const res = await httpRequest.put(`movies/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${bearer}`,
            }
        });
        console.log('Movie: ', res.data);
        return res.data;
    } catch (error) {
        console.log('update Movie error: ', error);
        throw error;
    }
}

export { updateMovieRequest }