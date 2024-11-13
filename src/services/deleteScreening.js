import * as httpRequest from "../utils/httpRequest";

const deleteScreening = async (id) => {
  try {
    const res = await httpRequest.DELETE(`/delete-screening/${Number(id)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export { deleteScreening };
