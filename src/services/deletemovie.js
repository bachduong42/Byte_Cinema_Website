import * as httpRequest from "../utils/httpRequest";

const deleteMovie = async (bearer, id) => {
    try {
        const res = await httpRequest.DELETE(`/delete-movies/${id}`, {
            headers: {
                Authorization: `Bearer ${bearer}`,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export { deleteMovie };
