import * as httpRequest from "../utils/httpRequest";
export const paymentRequest = async (bearer, id) => {
  try {
    const res = await httpRequest.get(`/vn-pay?bookingId=${id}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to get complete payment: ", error);
  }
};
