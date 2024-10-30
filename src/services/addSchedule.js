import * as httpRequest from '../utils/httpRequest';

export const addSchedule = async(startTime, ticketPrice, movieId, auditoriumId) => {
    try {
        const response = await httpRequest.post("/screening", {
            startTime,
            ticketPrice: String(ticketPrice),
            movieId,
            auditoriumId,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    }
    catch (error) {
      console.error(error);
    }
}