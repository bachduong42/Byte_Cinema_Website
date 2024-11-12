import * as httpRequest from "../utils/httpRequest";

export const addAuditorium = async (name, capacity, seatsPerRow) => {
  console.log("Vô add phòng");
  try {
    const res = await httpRequest.post(
      "/auditorium",
      {
        name,
        capacity,
        seatsPerRow,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
