import * as httpRequest from "../utils/httpRequest";

const getBookingRequest = async (id) => {
    try {
        const res = await httpRequest.get(`/bookings/detail?bookingId=${id}`, {
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
export default getBookingRequest;