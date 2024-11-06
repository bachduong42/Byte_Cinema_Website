import * as httpRequest from "../utils/httpRequest";

const deleteScreening = async (bearer, id) => {
  try {
    const res = await httpRequest.DELETE(`/delete-screening/${id}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export { deleteScreening };
