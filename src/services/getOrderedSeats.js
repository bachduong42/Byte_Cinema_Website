import * as httpRequest from "../utils/httpRequest";

const getOrderedSeatsByScreeningId = async (screeningId) => {
    try {
        const res = await httpRequest.get(`/seats?screeningId=${Number(screeningId)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export default getOrderedSeatsByScreeningId;