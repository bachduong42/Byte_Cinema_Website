import httpRequest from "../utils/httpRequest";

const updateMovieRequest = async (bearer, data, id) => {
    try {
        const res = await httpRequest.put(`movies/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${bearer}`,
                // 'Content-Type': 'application/json',
            },
        });
        console.log('Movie updated successfully:', res.data);
        return res.data;
    } catch (error) {
        if (error.response) {
            // Enhanced error logging
            console.error('Update Movie error:', {
                status: error.response.status,
                data: error.response.data, // Look here for the server error details
                headers: error.response.headers,
            });
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }

    }
};

export { updateMovieRequest };
