import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Components/Home/Home";
import LogIn from "../Components/LogInAndSignUp/LogIn";
import SignUp from "../Components/LogInAndSignUp/SignUp";

const AllRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const updateLogInStatus = (status) => {
        setIsLoggedIn(status);
    }

    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup")
        return <Navigate to="/login" />
    else
        return (
            <>
                <Routes>
                    {!isLoggedIn && <Route path="/login" element={<LogIn updateLogInStatus={updateLogInStatus} />} />}
                    {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
                    <Route path="/" element={<Home />} />
                </Routes>
            </>
        )
}

export default AllRoutes