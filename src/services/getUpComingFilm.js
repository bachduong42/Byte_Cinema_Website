import httpRequest from "../utils/httpRequest";

const getUpComingFilm = async () => {
  try {
    const res = await httpRequest.get("movies/upcoming");
    return res.data;
  } catch (error) {
    console.log("Login error: ", error);
    throw error;
  }
};
export { getUpComingFilm };
