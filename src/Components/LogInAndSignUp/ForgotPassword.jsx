const ForgotPassword = () => {
  return (
    <div>
      <h1>Forgot Password</h1>
      <p> This is Under Process.</p>
    </div>
  );
};

export default ForgotPassword;



// import React, { useState } from "react";
// import { showErrorToast, showSuccessToast } from "../Toast/ToastifyToast";
// import { ApiPostCall } from "../ApiCall/ApiCalls";
// import "./ForgotPassword.css";
// import logo from "../../Assets/Images/Logo_wh_bg.png";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const data = { email: email.toLowerCase() };
//       const result = await ApiPostCall("/forgotpassword", data);
//       console.log("The result of forgot password is: ", result);

//       showSuccessToast("Password reset link sent to your email.");
//     } catch (error) {
//       console.log("The error is: ", error);
//       if (error.response && error.response.status && error.response.status === 404)
//         showErrorToast("Email not found");
//       else showErrorToast("Something went wrong");
//     }
//   };

//   return (
//     <div className="ForgotPassword_main">
//       <div className="ForgotPassword_main-container">
//         <div className="ForgotPassword_background">
//           <div className="ForgotPassword_interface">
//             <div className="ForgotPassword_interface-inner">
//               <div className="ForgotPassword_text">
//                 <div className="ForgotPassword_Heading">
//                   <h2>Forgot Password</h2>
//                 </div>

//                 <div className="ForgotPassword_textBody">
//                   <p>
//                     Enter your email address to receive a password reset link.
//                   </p>
//                 </div>
//               </div>

//               <div className="ForgotPassword_form">
//                 <div className="ForgotPassword_form_container">
//                   <div className="ForgotPassword_formTop">
//                     <div className="ForgotPassword_logo">
//                       <img src={logo} alt="Logo" />
//                     </div>
//                   </div>

//                   <form
//                     className="ForgotPassword_formBottom"
//                     onSubmit={handleForgotPassword}
//                   >
//                     <div className="ForgotPassword_formBottom-Up">
//                       <div className="ForgotPassword_email">
//                         <label htmlFor="email">Email</label>
//                         <input
//                           className="ForgotPassword_inputArea"
//                           type="email"
//                           id="ForgotPassword_email"
//                           value={email}
//                           onChange={handleEmailChange}
//                           name="email"
//                           placeholder="Enter your email"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="ForgotPassword_formBottom-Down">
//                       <div className="ForgotPassword_button">
//                         <button className="ForgotPassword_button" type="submit">
//                           Send Reset Link
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
