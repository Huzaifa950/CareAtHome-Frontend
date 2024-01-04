import React, { useState } from 'react'
import './LogIn.css'
import logo from "../../Assets/Images/Logo.png"
import { LeftSide } from './common'
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
        <div>
            <div className='main'>

                <LeftSide desc={"Enter your credentials to unlock access and explore the personalized care experience waiting for you."} title={"Feel at Home! Take a step into"} msg={"Care At Home"} />

                <div className='rightSide'>
                    <div>
                        <div className='rightUp'>
                            <div className='logo'>
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className='rightDown'>
                            <div className='topSignIn'>
                                <text>SIGN IN</text>
                                {/* <a href="#">SignUp</a> */}
                            </div>
                            <div className='formMain'>

                                <form className='formBox' onSubmit={e => {
                                    e.preventDefault();
                                    handleLogIn();
                                }}>
                                    <div className='email'>
                                        <label htmlFor="email">Username / Email*</label>
                                        <input type='text' id="email" value={userDetail.usernameOrEmail} onChange={handleUserDetailChange} name="usernameOrEmail" placeholder='Enter Username / Email' required />
                                    </div>

                                    <div className='password'>
                                        <label htmlFor="password">Password*</label>
                                        <input type="password" id="password" value={userDetail.password} onChange={handleUserDetailChange} name="password" placeholder='Enter Password' required />
                                    </div>

                                    <div className='forgot_sign'>
                                        <div className='forgot'>
                                            <a href="#">Forgot Password ?</a>
                                        </div>
                                        <div className='signup'>
                                            <a href="/signup"> Signup</a>
                                        </div>
                                    </div>

                                    <div className='button'>
                                        <button className='logInButton' type="submit">LogIn</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn

