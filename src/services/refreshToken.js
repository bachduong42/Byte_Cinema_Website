import httpRequest from '../utils/httpRequest';

const getUser = async () => {
    try {
        const res = await httpRequest.get('auth/refresh', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}