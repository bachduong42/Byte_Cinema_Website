import httpRequest from "../utils/httpRequest";

const createBookingRequest = async (bearer, screeningId, confirmSeats) => {
    try {
        const res = await httpRequest.post('bookings', {
            screeningId: screeningId,
            seats: confirmSeats,
        }, {
            headers: {
                'Authorization': `Bearer ${bearer}`,
            }
        });
        console.log('Booking: ', res.data);
        return res.data;
    } catch (error) {
        console.log('Create Booking Error: ', error);
        throw error;
    }
}

export { createBookingRequest }