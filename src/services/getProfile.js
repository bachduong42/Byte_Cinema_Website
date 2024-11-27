import * as httpRequest from "../utils/httpRequest";
export const getProfileRequest = async (bearer) => {
  try {
    const res = await httpRequest.get(`/user-info`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to get user profile: ", error);
  }
};
