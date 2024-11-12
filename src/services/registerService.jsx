import * as httpRequest from '../utils/httpRequest'

export const register = async (email, password, confirmPassword) => {
    try {
        const res = await httpRequest.post('/auth/register', {
            email,
            password,
            confirmPassword,
            roleId: 2,
        });
        return res.data
    }
    catch (error) {
        throw error.response.data.data.error;
    }
}