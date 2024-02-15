import React, { useState } from 'react'
import './LogIn.css'
import logo from "../../Assets/Images/Logo_wh_bg.png"
import { useNavigate } from 'react-router-dom'
import { alphaNumericWithUnderscoreRegex, emailRegex, validateRegex } from '../Common/Common'
import { showErrorToast, showSuccessToast } from '../Toast/ToastifyToast'
import { ApiPostCall } from '../ApiCall/ApiCalls'

function LogIn({ updateLogInStatus }) {
    const [userDetail, setUserDetail] = useState({ usernameOrEmail: "", password: "" })
    const nav = useNavigate();

    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prevDetail => ({ ...prevDetail, [name]: value }))
    }

    const handleLogIn = async () => {
        const isEmail = userDetail.usernameOrEmail.includes("@");
        if (isEmail) {
            if (!validateRegex(userDetail.usernameOrEmail, emailRegex)) {
                showErrorToast("Invalid Email")
                return
            }
        }
        else {
            if (userDetail.usernameOrEmail.length < 4) {
                showErrorToast("Username must be atleast 4 characters long")
                return
            }
            else if (!validateRegex(userDetail.usernameOrEmail, alphaNumericWithUnderscoreRegex)) {
                showErrorToast("Invalid Username")
                return
            }
        }
        if (userDetail.password.length > 100 || userDetail.password.length < 8 ||
            userDetail.usernameOrEmail.length > 100 || userDetail.usernameOrEmail.length > 50) {
            showErrorToast(`Incorrect ${isEmail ? "Email" : "Username"} or Password`)
            return
        }

        const data = {
            password: userDetail.password
        };
        if (isEmail) {
            data.email = userDetail.usernameOrEmail.toLowerCase();
        } else {
            data.username = userDetail.usernameOrEmail.toLowerCase();
        }

        try {
            const result = await ApiPostCall("/login", data)
            console.log("The result of login is: ", result)

            showSuccessToast("Successfully Logged In")
            updateLogInStatus(true);
            nav("/");
        } catch (error) {
            console.log("The error is: ", error)
            if (error.response.status === 404)
                showErrorToast(`Incorrect ${isEmail ? "Email" : "Username"} or Password`)
            else showErrorToast("Something went wrong")
        }

    }

    return (
        <div className='LogIn_main'>
            <div className='LogIn_main-container'>
                <div className='LogIn_background'>
                    <div className='LogIn_interface'>
                        <div className='LogIn_interface-inner'>
                            <div className='LogIn_text'>
                                <div className='LogIn_Heading'>
                                    <h2>
                                        Welcome to Care At Home
                                    </h2>
                                </div>

                                <div className='LogIn_textBody'>
                                    <p>
                                        Unlock a world of personalized care at your fingertips. Log in to the <i><b>Care At Home</b></i> website and experience a seamless journey tailored to your unique needs.
                                    </p>
                                </div>
                            </div>

                            <div className='LogIn_form'>
                                <div className='LogIn_form_container'>
                                    <div className='LogIn_formTop'>
                                        <div className='LogIn_logo'>
                                            <img src={logo} alt="Logo" />
                                        </div>

                                        <div className='LogIn_login'>
                                            <h1>Log In</h1>
                                        </div>
                                    </div>

                                    <form className='LogIn_formBottom' onSubmit={e => {
                                        e.preventDefault();
                                        handleLogIn();
                                    }}>
                                        <div className='LogIn_formBottom-Up'>
                                            <div className='LogIn_email'>
                                                <label htmlFor="email">Username / Email</label>
                                                <input className='LogIn_inputArea' type='text' id="LogIn_email" value={userDetail.usernameOrEmail} onChange={handleUserDetailChange} name="usernameOrEmail" placeholder='Enter Username / Email' required />
                                            </div>

                                            <div className='LogIn_password'>
                                                <label htmlFor="password">Password</label>
                                                <input className='LogIn_inputArea' type="password" id="LogIn_password" value={userDetail.password} onChange={handleUserDetailChange} name="password" placeholder='Enter Password' required />
                                            </div>
                                        </div>

                                        <div className='LogIn_formBottom-Down'>
                                            <div className='LogIn_button'>
                                                <button className='LogIn_logInButton' type="submit">LogIn</button>
                                            </div>

                                            <div className='LogIn_forgot_sign_main'>
                                                <div className='LogIn_forgot_sign_container'>
                                                    <div className='LogIn_forgot'>
                                                        <a href="/forgotpassword">Forgot Password ?</a>
                                                    </div>
                                                    <div className='LogIn_signup'>
                                                        <a href="/signup"> Signup</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn