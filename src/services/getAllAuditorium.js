import * as httpRequest from "../utils/httpRequest";

export const getAllAuditorium = async (bearer) => {
  try {
    const res = await httpRequest.get("/auditorium", {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Failed to get all auditoriums", error);
  }
};
