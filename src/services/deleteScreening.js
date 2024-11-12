import * as httpRequest from "../utils/httpRequest";

const deleteScreening = async (id) => {
  try {
    const res = await httpRequest.DELETE(`/delete-screening/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export { deleteScreening };
