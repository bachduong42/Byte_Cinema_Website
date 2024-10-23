import httpRequest from "../utils/httpRequest";

const getMovieGenres = async (bearer) => {
    try {
        const res = await httpRequest.get('genres', {
            headers: {
                'Authorization': `Bearer ${bearer}`
            }
        });
        console.log('Movie genres: ', res.data.data.map(({films, ...rest}) => rest));
        return res.data.data.map(({films, ...rest}) => rest);
    } catch (error) {
        console.log('Movie genres error: ', error);
        throw error;
    }
}

export { getMovieGenres }