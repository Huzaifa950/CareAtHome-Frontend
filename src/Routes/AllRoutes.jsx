import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Components/Home/Home";
import LogIn from "../Components/LogInAndSignUp/LogIn";
import SignUp from "../Components/LogInAndSignUp/SignUp";
import { ApiGetCall } from "../Components/ApiCall/ApiCalls";
import ForgotPassword from "../Components/LogInAndSignUp/ForgotPassword";

const AllRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const location = useLocation();

    const updateUserDetails = (data) => {
        setUserDetail(data);
    }

    const updateLogInStatus = (status) => {
        setIsLoggedIn(status);
    }

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await ApiGetCall('/getuserinfo');
                if (result.data) {
                    console.log("user info data: ", result.data);
                    updateUserDetails(result.data);
                    updateLogInStatus(true);
                }
                else {
                    updateLogInStatus(false);
                }
            } catch (error) {
                console.error("error /getuserinfo", error);
                updateLogInStatus(false);
            }

        }
        getUserInfo();
    }, [isLoggedIn]);

    console.log("Location: ", location.pathname)

    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgotpassword")
        return <Navigate to="/login" />
    if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgotpassword"))
        return <Navigate to="/" />
    else
        return (
            <>
                <Routes>
                    {!isLoggedIn && <Route path="/login" element={<LogIn updateLogInStatus={updateLogInStatus} />} />}
                    {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
                    {!isLoggedIn && <Route path="/forgotpassword" element={<ForgotPassword />} />}
                    <Route path="*" element={<Home updateLogInStatus={updateLogInStatus} userInfo={userDetail} />} />
                </Routes>
            </>
        )
}

export default AllRoutes