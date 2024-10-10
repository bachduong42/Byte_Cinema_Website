import * as httpRequest from "../utils/httpRequest";
export const verifyOTP = async (email, otp) => {
  console.log(email),
    console.log(otp)
  try {
    const response = await httpRequest.post("/auth/verify-otp", {
      email,
      otp,
    });
      return response.data;
  } catch (error) {
    throw error.response.data.data.error;
  }
};
