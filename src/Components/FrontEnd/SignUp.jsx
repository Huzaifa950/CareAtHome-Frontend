import React, { useState } from 'react'
import './SignUp.css'
import leftImage from '../BackGround Images/SignUp_Img.jpg'
import logo from '../BackGround Images/Logo.png'
// import login from './LogIn.jsx'

function SignUp() {
    const [userDetail, setUserDetail] = useState({ username: "", email: "", password: "", fullName: "" })

    const handleUserDetailChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prevDetail => ({ ...prevDetail, [name]: value }))
    }

    const handleSignUp = () => {
        console.log(userDetail)
        if (userDetail.username.length < 4) {
            console.log("Username must be atleast 4 characters long")
        }
        
    }

    return (
        <div>
            <div className='main'>

                <div className='leftSide'>
                    <div className='content'>
                        <img src={leftImage} alt="CareImage" />
                        <div>
                            <h1>Enter the World of Home Care.</h1>
                            <p> Where love and care reside, home becomes a sanctuary of healing and warmth.</p>
                        </div>
                    </div>
                </div>

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
                                                        <a href="">SignIn</a>
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