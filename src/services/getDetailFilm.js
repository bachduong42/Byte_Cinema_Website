import * as httpRequest from "../utils/httpRequest";

export const getDetailFilm = async (id) => {
  try {
    const res = await httpRequest.get(`movies/${id}`);
    return res.data;
  } catch (error) {
    console.log("Faied to get movie by Id", error);
  }
};
