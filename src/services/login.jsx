import httpRequest from '../utils/httpRequest';

const loginService = async (email, password) => {
    try {
        console.log('Payload:', { email, password });
        const res = await httpRequest.post('auth/login', {
            email,
            password,
        });
        const cookies = document.cookie;
        console.log('Cookies:', cookies);
        console.log('Response:', res);
        return res.data;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
};
const logoutService = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        const res = await httpRequest.post('auth/logout', {
            accessToken,
            refreshToken,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}

const getUser = async () => {
    try {
        const res = await httpRequest.get('user-info', {
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

const forgetPasswordService = async (email) => {
    try {
        const res = await httpRequest.post('auth/reset-password-request', null, {
            params: {
                email: email
            }
        });
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}
const resetPasswordService = async (email, password) => {
    try {
        const res = await httpRequest.post('auth/reset-password', {
            email: email,
            password: password,
            confirmPassword: password
        });
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}

export { loginService, logoutService, getUser, forgetPasswordService, resetPasswordService }