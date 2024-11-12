import * as httpRequest from "../utils/httpRequest";
export const getScreeningById = async (bearer, id) => {
  try {
    const res = await httpRequest.get(`/screening/${id}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to get screening: ", error);
  }
};
