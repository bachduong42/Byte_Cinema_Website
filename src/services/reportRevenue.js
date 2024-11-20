import * as httpRequest from "../utils/httpRequest";

const reportRevenueByFilm = async () => {
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
const reportRevenueByMonth = async (month) => {
  try {
    const response = await httpRequest.get(`/movies/revenue/month/${month}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get revenue by film", error);
  }
}

const reportRevenueByYear = async (year) => {
  try {
    const response = await httpRequest.get(`/movies/revenue/year/${year}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get revenue by film", error);
  }
}
export { reportRevenueByFilm, reportRevenueByMonth, reportRevenueByYear }