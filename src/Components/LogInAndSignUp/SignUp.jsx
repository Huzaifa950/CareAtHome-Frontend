import React, { useEffect, useState } from 'react'
import './SignUp.css'
import logo from "../../Assets/Images/Logo.png"
import { LeftSide } from './common'
import { showErrorToast, showSuccessToast } from '../Toast/ToastifyToast'
import { alphaNumericWithUnderscoreRegex, alphabetRegex, alphabetWithSpaceRegex, capitalizeFirstLetter, emailRegex, validateRegex } from '../Common/Common'
import { useNavigate } from 'react-router-dom'
import { ApiPostCall } from '../ApiCall/ApiCalls'

function SignUp() {
    const nav = useNavigate();
    const [userDetail, setUserDetail] = useState({ username: "", email: "", password: "", fullName: "" })

    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prevDetail => ({ ...prevDetail, [name]: value }))
    }

    const handleSignUp = async () => {
        console.log(userDetail)
        if (userDetail.username.length < 4)
            showErrorToast("Username must be atleast 4 characters long")
        else if (userDetail.password.length < 8)
            showErrorToast("Password must be atleast 8 characters long")
        else if (userDetail.username.length > 50)
            showErrorToast("Username must be less than 50 characters")
        else if (userDetail.fullName.length > 50)
            showErrorToast("Full Name must be less than 50 characters")
        else if (userDetail.email.length > 100)
            showErrorToast("Email must be less than 100 characters")
        else if (userDetail.password.length > 100)
            showErrorToast("Password must be less than 100 characters")
        else if (!validateRegex(userDetail.fullName, alphabetWithSpaceRegex))
            showErrorToast("Invalid Full Name")
        else if (!validateRegex(userDetail.username, alphaNumericWithUnderscoreRegex))
            showErrorToast("Invalid Username")
        else if (!validateRegex(userDetail.email, emailRegex))
            showErrorToast("Invalid Email")
        else {
            try {
                const data = {
                    username: userDetail.username.toLowerCase(),
                    email: userDetail.email.toLowerCase(),
                    password: userDetail.password,
                    fullName: capitalizeFirstLetter(userDetail.fullName)
                }
                const result = await ApiPostCall("/addnewuser", data)
                if (result.status === 202) {
                    if (result.data === "username")
                        showErrorToast("Username already exists")
                    else
                        showErrorToast("Email already exists")
                }
                else {
                    showSuccessToast("Successfully Signed Up")
                    nav("/login")
                }
            } catch (error) {
                console.log("The error is: ", error)
                showErrorToast("Something went wrong")
            }
        }
    }

    return (
        <div>
            <div className='main'>

                <LeftSide desc={"Where love and care reside, home becomes a sanctuary of healing and warmth."} title={"Enter the World of Home Care."} />

                <div className='rightSide'>
                    <div>
                        <div className='rightUp'>
                            <div className='logo'>
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className='rightDown'>
                            <div className='fullForm'>
                                <div className='topSignUp'>
                                    <text>SIGN UP</text>
                                    {/* <a href="#">SignUp</a> */}
                                </div>
                                <div className='formMain'>
                                    <form className='formBox' onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSignUp()
                                    }
                                    }>

                                        <div className='formMain'>
                                            <div className='formContainer'>
                                                <div className='formInner'>
                                                    <div className='name_user'>
                                                        <div className='email'>
                                                            <label htmlFor="username">User Name*</label>
                                                            <input type="username" id="username" value={userDetail.username} onChange={e => handleUserDetailChange(e)} name="username" placeholder='Enter User Name' required />
                                                        </div>
                                                        <div className='password'>
                                                            <label htmlFor="fullname">Full Name*</label>
                                                            <input type="fullname" id="fullname" value={userDetail.fullName} onChange={handleUserDetailChange} name="fullName" placeholder='Enter Full Name' required />
                                                        </div>
                                                    </div>
                                                    <div className='email_pass'>
                                                        <div className='email'>
                                                            <label htmlFor="email">Email*</label>
                                                            <input type="email" id="email" value={userDetail.email} onChange={handleUserDetailChange} name="email" placeholder='ex. myname@gmail.com' required />
                                                        </div>
                                                        <div className='password'>
                                                            <label htmlFor="password">Password*</label>
                                                            <input type="password" id="password" value={userDetail.password} onChange={handleUserDetailChange} name="password" placeholder='********' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='formBottom'>
                                                    <div>
                                                        <p>Account already exists ?</p>
                                                    </div>
                                                    <div>
                                                        <a href="/login">SignIn</a>
                                                    </div>
                                                </div>
                                                <div className='SignUpbutton'>
                                                    <button className='signUpButton' type="submit">Register</button>
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

export default SignUp