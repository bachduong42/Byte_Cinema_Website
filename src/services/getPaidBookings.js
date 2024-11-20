import * as httpRequest from "../utils/httpRequest";

const getPaidBookingsRequest = async (status, page) => {
    try {
        const res = await httpRequest.get(`/bookings/get-all?isAlreadyScreened=${status}&page=${page}&size=4`, {
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
export default getPaidBookingsRequest;