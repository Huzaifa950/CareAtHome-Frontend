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
        <div className='main'>
            <div className='main-container'>
                <div className='background'>
                    <div className='interface'>
                        <div className='interface-inner'>
                            <div className='text'>
                                <div className='Heading'>
                                    <h2>
                                        Welcome to Care At Home
                                    </h2>
                                </div>

                                <div className='textBody'>
                                    <p>
                                        Unlock a world of personalized care at your fingertips. Log in to the <i><b>Care At Home</b></i> website and experience a seamless journey tailored to your unique needs.
                                    </p>
                                </div>
                            </div>

                            <div className='form'>
                                <div className='form_container'>
                                    <div className='formTop'>
                                        <div className='logo'>
                                            <img src={logo} alt="Logo" />
                                        </div>

                                        <div className='login'>
                                            <h1>Log In</h1>
                                        </div>
                                    </div>

                                    <form className='formBottom' onSubmit={e => {
                                        e.preventDefault();
                                        handleLogIn();
                                    }}>
                                        <div className='formBottom-Up'>
                                            <div className='email'>
                                                <input className='inputArea' type='text' id="email" value={userDetail.usernameOrEmail} onChange={handleUserDetailChange} name="usernameOrEmail" placeholder='Enter Username / Email' required />
                                            </div>

                                            <div className='password'>
                                                <input className='inputArea' type="password" id="password" value={userDetail.password} onChange={handleUserDetailChange} name="password" placeholder='Enter Password' required />
                                            </div>
                                        </div>

                                        <div className='formBottom-Down'>


                                            <div className='button'>
                                                <button className='logInButton' type="submit">LogIn</button>
                                            </div>

                                            <div className='forgot_sign_main'>
                                                <div className='forgot_sign_container'>
                                                    <div className='forgot'>
                                                        <a href="/forgotpassword">Forgot Password ?</a>
                                                    </div>
                                                    <div className='signup'>
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