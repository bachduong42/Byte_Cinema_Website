import * as httpRequest from "../utils/httpRequest";

export const getDetailFilm = async (id) => {
  console.log(id);
  console.log(localStorage.getItem("accessToken"));
  try {
    const res = await httpRequest.get(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Faied to get movie by Id", error);
  }
};
