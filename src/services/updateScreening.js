import * as httpRequest from "../utils/httpRequest";

export const updateScreening = async (
  id,
  startTime,
  ticketPrice,
  movieId,
  auditoriumId
) => {
  try {
    const response = await httpRequest.put(
      `/update-screening/${id}`,
      {
        startTime,
        ticketPrice: String(ticketPrice),
        movieId,
        auditoriumId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
