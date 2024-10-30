import httpRequest from "../utils/httpRequest";

const getScreeningRequest = async (bearer, id) => {
    try {
        const res = await httpRequest.get(`/screening/${id}`, {
            headers: {
                Authorization: `Bearer ${bearer}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('getScreeningRequest error: ', error);
        throw error;
    }
}

export { getScreeningRequest }