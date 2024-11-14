import * as httpRequest from "../utils/httpRequest";

export const countTicketByScreening = async (id) => {
  try {
    const response = await httpRequest.get(`/screening-booking-count/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
