import logo from "../../Assets/Images/Logo_wh_bg.png"
// import 'bootstrap/dist/css/bootstrap.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './footer.css'


function Footer(){
    return(
        <div className="footerMain">
            <div className="footerContainer">
                <div className="footerBox">
                    <div className="footerLogo">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className="footer_socialMediaIcons">
                        <a href="https://www.facebook.com/" target="_blank">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.twitter.com/" target="_blank">
                            <FontAwesomeIcon icon={ faTwitter } />
                        </a>
                    </div>

                    <div className="footer_linkMain">
                        <div className="footer_linksBody">
                            <a href="#">Home</a>
                            <a href="#">About Us</a>
                            <a href="#">FAQs</a>
                            <a href="#">Blog</a>
                        </div>
                    </div>
                </div>
                <div className="footerBottom">
                    <div className="footerBottom_horizontalLine"></div>
                    <p className="footerBottom_rightsReserved">&copy; 2024 Care At Home. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;