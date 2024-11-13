import * as httpRequest from "../utils/httpRequest";

export const deleteAuditorium = async (id) => {
  try {
    const res = await httpRequest.DELETE(`/auditorium/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data.message
  }
};
