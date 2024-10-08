import * as httpRequest from "../utils/httpRequest";

export const resendOTP = async (email) => {
  try {
    const res = await httpRequest.post(`/auth/resend?email=${email}`);
    return res.data;
  } catch (error) {
    throw error.response.data.data.error;
  }
};
