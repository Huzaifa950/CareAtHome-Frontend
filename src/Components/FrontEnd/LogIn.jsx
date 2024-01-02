import React from 'react'
import './LogIn.css'
import leftImage from '../BackGround Images/BackGround.jpg'
import logo from '../BackGround Images/Logo.png'

function LogIn() {
  return (
    <div>
      <div className='main'>

        <div className='leftSide'>
            <div className='content'>
                <img src={leftImage} alt="CareImage" />
                <div>
                    <h1>Feel at Home! Take a step into <i>Care At Home</i></h1>
                    <p> Enter your credentials to unlock access and explore the personalized care experience waiting for you.</p>
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
                    <div className='topSignIn'>
                        <text>SIGN IN</text>
                        {/* <a href="#">SignUp</a> */}
                    </div>
                    <div className='formMain'>
                        <form className='formBox'>
                            <div className='email'>
                                <label htmlFor="email">Email*</label>
                                <input type="email" id="email" name="email" placeholder='Enter Email' required />
                            </div>

                            <div className='password'>
                                <label htmlFor="password">Password*</label>
                                <input type="password" id="password" name="password" placeholder='Enter Password' required />
                            </div>

                            <div className='forgot_sign'>
                                <div className='forgot'>
                                    <a href="#">Forgot Password ?</a>
                                </div>
                                <div className='signup'>
                                    <a href="#"> Signup</a>
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

