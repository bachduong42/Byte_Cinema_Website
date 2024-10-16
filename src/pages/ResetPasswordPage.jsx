// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { checkToken } from "../services/login";
// import { toast } from "react-toastify";
// import ChangePassword from "../modules/auth/ChangePassword";

// function ResetPassWordPage() {
//     const { token } = useParams();
//     console.log(token);
//     const [isValidateToken, setIsValidateToken] = useState(false);
//     useEffect(() => {
//         const verifyToken = async () => {
//             const isValid = await checkToken(token);
//             setIsValidateToken(isValid);
//             console.log(isValid);
//         }
//         if (token) {
//             verifyToken();
//         }

//     }, [token]);
//     if (isValidateToken === null) {
//         return null;
//     }
//     if (!isValidateToken.info) {
//         toast.error('Token is invalid or expired');
//         return null;
//     }

//     return (
//         <ChangePassword token={token}></ChangePassword>
//     );

// }

// export default ResetPassWordPage;