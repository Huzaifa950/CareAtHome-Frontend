import React from 'react'
import './SignUp.css'
import leftImage from '../BackGround Images/SignUp_Img.jpg'
import logo from '../BackGround Images/Logo.png'
// import login from './LogIn.jsx'

function LogIn() {
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
                            <form className='formBox'>

                                <div className='formMain'>
                                    <div className='formContainer'>
                                        <div className='formInner'>
                                            <div className='name_user'>
                                                <div className='email'>
                                                    <label htmlFor="username">User Name*</label>
                                                    <input type="username" id="username" name="username" placeholder='Enter User Name' required />
                                                </div>
                                                <div className='password'>
                                                    <label htmlFor="fullname">Full Name*</label>
                                                    <input type="fullname" id="fullname" name="fullname" placeholder='Enter Full Name' required />
                                                </div>
                                            </div>
                                            <div className='email_pass'>
                                                <div className='email'>
                                                    <label htmlFor="email">Email*</label>
                                                    <input type="email" id="email" name="email" placeholder='ex. myname@gmail.com' required />
                                                </div>
                                                <div className='password'>
                                                    <label htmlFor="password">Password*</label>
                                                    <input type="password" id="password" name="password" placeholder='********' required />
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

export default LogIn