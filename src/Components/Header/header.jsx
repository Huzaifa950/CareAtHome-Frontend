
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/Logo_wh_bg.png"
import userLogo from "../../Assets/Images/userIcon.png"
import './header.css'

function Header() {
    return (
        <div className="headerMain">
            <div className="headerContainer">
                <div className="headerBox">
                    <div className="headerLeft">
                        <div className='header_logo'>
                            <img src={logo} alt="Logo" />
                        </div>
                    </div>
                    <div className="headerMiddle">
                        <Link to="">Home</Link>
                        <Link to="aboutus">About Us</Link>
                        <Link to="faqs">FAQs</Link>
                        <Link to="contactus">Contact Us</Link>
                    </div>
                    <div className="headerRight">
                        <div className="joinAs">
                            <p>Join As</p>
                        </div>
                        <div className="careTaker">
                            <button className='caretakerButton' type="submit">CareTaker</button>
                        </div>
                        <div className="patient">
                            <button className='patientButton' type="submit">Patient</button>
                        </div>
                    </div>
                    <div className="headerProfile">
                        <div className="userProfile">
                            <img src={userLogo} alt="Logo" />
                        </div>
                        <div className="headerUserName">
                            <p>UserName</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
