import React, { useEffect, useState } from "react";
import "./SignUp.css";
import logo from "../../Assets/Images/Logo_wh_bg.png";
// import { LeftSide } from './common'
import { showErrorToast, showSuccessToast } from "../Toast/ToastifyToast";
import {
  alphaNumericWithUnderscoreRegex,
  alphabetRegex,
  alphabetWithSpaceRegex,
  capitalizeFirstLetter,
  emailRegex,
  validateRegex,
} from "../Common/Common";
import { Link, useNavigate } from "react-router-dom";
import { ApiPostCall } from "../ApiCall/ApiCalls";

function SignUp() {
  const nav = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleSignUp = async () => {
    console.log(userDetail);
    if (userDetail.username.length < 4)
      showErrorToast("Username must be atleast 4 characters long");
    else if (userDetail.password.length < 8)
      showErrorToast("Password must be atleast 8 characters long");
    else if (userDetail.username.length > 50)
      showErrorToast("Username must be less than 50 characters");
    else if (userDetail.fullName.length > 50)
      showErrorToast("Full Name must be less than 50 characters");
    else if (userDetail.email.length > 100)
      showErrorToast("Email must be less than 100 characters");
    else if (userDetail.password.length > 100)
      showErrorToast("Password must be less than 100 characters");
    else if (!validateRegex(userDetail.fullName, alphabetWithSpaceRegex))
      showErrorToast("Invalid Full Name");
    else if (
      !validateRegex(userDetail.username, alphaNumericWithUnderscoreRegex)
    )
      showErrorToast("Invalid Username");
    else if (!validateRegex(userDetail.email, emailRegex))
      showErrorToast("Invalid Email");
    else {
      try {
        const data = {
          username: userDetail.username.toLowerCase(),
          email: userDetail.email.toLowerCase(),
          password: userDetail.password,
          fullName: capitalizeFirstLetter(userDetail.fullName),
        };
        const result = await ApiPostCall("/addnewuser", data);
        if (result.status === 202) {
          if (result.data === "username")
            showErrorToast("Username already exists");
          else showErrorToast("Email already exists");
        } else {
          showSuccessToast("Successfully Signed Up");
          nav("/login");
        }
      } catch (error) {
        console.log("The error is: ", error);
        showErrorToast("Invalid email address");
        // showErrorToast("Something went wrong");
      }
    }
  };

  return (
    <div className="SignUp_main">
      <div className="SignUp_main-container">
        <div className="SignUp_background">
          <div className="SignUp_interface">
            <div className="SignUp_interface-inner">
              <div className="SignUp_text">
                <div className="SignUp_Heading">
                  <h2>Greetings to Care at Home</h2>
                </div>

                <div className="SignUp_textBody">
                  <p>
                    Unlock the care services by joining{" "}
                    <b>
                      <i>Care At Home</i>
                    </b>
                    ! Don't miss out - register today and open the door to a new
                    realm of services and possibilities!
                  </p>
                </div>
              </div>

              <div className="SignUp_form">
                <div className="SignUp_form_container">
                  <div className="SignUp_formTop">
                    <div className="SignUp_logo">
                      <img src={logo} alt="Logo" />
                    </div>

                    <div className="SignUp_login">
                      <h1>Sign Up</h1>
                    </div>
                  </div>

                  <form
                    className="SignUp_formBottom"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSignUp();
                    }}
                  >
                    <div className="SignUp_formBottom-Up">
                      <div className="SignUp_full_email">
                        <div className="SignUp_fullName">
                          <label htmlFor="fullname">Full Name</label>
                          <input
                            type="fullname"
                            id="SignUp_fullname"
                            value={userDetail.fullName}
                            onChange={handleUserDetailChange}
                            name="fullName"
                            placeholder="Enter Full Name"
                            required
                          />
                        </div>
                        <div className="SignUp_email">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="SignUp_email"
                            value={userDetail.email}
                            onChange={handleUserDetailChange}
                            name="email"
                            placeholder="ex. myname@gmail.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="SignUp_user_pass">
                        <div className="SignUp_username">
                          <label htmlFor="SignUp_username">User Name</label>
                          <input
                            type="username"
                            id="SignUp_username"
                            value={userDetail.username}
                            onChange={(e) => handleUserDetailChange(e)}
                            name="username"
                            placeholder="Enter User Name"
                            required
                          />
                        </div>
                        <div className="SignUp_password">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            id="SignUp_password"
                            value={userDetail.password}
                            onChange={handleUserDetailChange}
                            name="password"
                            placeholder="********"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="SignUp_formBottom-Down">
                      <div className="SignUp_button">
                        <button className="SignUp_logInButton" type="submit">
                          Register
                        </button>
                      </div>

                      <div className="SignUp_forgot_sign_main">
                        <div className="SignUp_forgot_sign_container">
                          <div className="SignUp_forgot">
                            <p>Already have an Account ?</p>
                            {/* <Link to="/login"> Already have an Account ?</Link> */}
                          </div>
                          <div className="SignUp_signup">
                            <Link to="/login"> LogIn</Link>
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
  );
}
export default SignUp;
