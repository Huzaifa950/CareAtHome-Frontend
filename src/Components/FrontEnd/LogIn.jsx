import React from 'react'
import './LogIn.css'
import logo from '../../../Assets/Images/BackGround.jpg'
import { LeftSide } from './common'

function LogIn() {
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

