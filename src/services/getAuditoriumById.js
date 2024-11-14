import * as httpRequest from "../utils/httpRequest";

export const getAuditorium = async (id) => {
    console.log(id)
  try {
    const res = await httpRequest.get(`/auditorium/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Failed to get auditorium", error);
  }
};
