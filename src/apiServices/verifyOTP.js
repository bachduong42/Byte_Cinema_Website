import * as httpRequest from "../utils/httpRequest";
export const verifyOTP = async (email, otp) => {
  try {
    const response = await httpRequest.post("/auth/verify", {
      email,
      otp,
    });
      return response.data;
  } catch (error) {
    throw error.response.data.data.error;
  }
};
