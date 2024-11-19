import * as httpRequest from "../utils/httpRequest";

export const updateAuditorium = async (id, name) => {
  try {
    const res = await httpRequest.put(
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
    console.log(error)
    throw error.response.data.message;
  }
};
