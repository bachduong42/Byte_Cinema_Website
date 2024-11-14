import * as httpRequest from "../utils/httpRequest";
export const transactionRequest = async (bearer, code) => {
  try {
    const res = await httpRequest.get(`/bookings/successful?transactionCode=${code}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to get transaction: ", error);
  }
};
