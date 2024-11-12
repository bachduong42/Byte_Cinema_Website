import * as httpRequest from "../utils/httpRequest";

export const updateAuditorium = async (id, name) => {
  try {
    const res = await httpRequest.PUT(
      `/auditorium/${id}`,
      {
        name
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
