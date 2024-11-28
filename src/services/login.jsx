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
        const res = await httpRequest.get('auth/forgot-password', {
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

const checkToken = async (token) => {
    try {
        const res = await httpRequest.get('auth/verify-token', {
            params: {
                token: token
            }
        });
        // console.log(res);
        return res.data.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}

const resetPasswordService = async (token, password) => {
    try {
        const res = await httpRequest.post('auth/change-password', {
            token: token,
            password: password,
            confirmPassword: password
        });
        return res.data;
    } catch (error) {
        console.log('logout error: ', error);
        throw error;
    }
}

const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const res = await httpRequest.patch(
      "/users/update-password",
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Failed to update password ", error);
  }
};




export { loginService, logoutService, getUser, forgetPasswordService, resetPasswordService, checkToken, changePassword}