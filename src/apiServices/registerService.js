import * as httpRequest from '../utils/httpRequest'

export const register = async (email, password, confirmPassword) => {
    try {
        const res = await httpRequest.post('/api/v1/auth/register', {
          email,
          password,
          confirmPassword,
          roleId: 15,
        });
        return res.data
    }
    catch (error) {
        throw error.response.data.data.error;
    }
}