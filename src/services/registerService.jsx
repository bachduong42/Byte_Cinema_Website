import request from '../utils/httpRequest'

export const register = async (email, password, confirmPassword) => {
    try {
        const res = await request.post('/auth/register', {
            email,
            password,
            confirmPassword,
            roleId:1
        })
        return res.data
    }
    catch (error) {
        console.log('Register error: ', error);
    }
}