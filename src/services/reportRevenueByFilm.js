import * as httpRequest from "../utils/httpRequest";

export const reportRevenueByFilm = async () => {
  try {
    const response = await httpRequest.get("/movies/revenue", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get revenue by film", error);
  }
};
