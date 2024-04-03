import "./aboutUs.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHoldingChild,
  faHandHoldingHeart,
  faGlobe,
  faMapPin,
  faHouseUser,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

function aboutUs() {
  return (
    <div className="aboutUs_main">
      <div className="aboutUs_container">
        <div className="aboutUs_containerBox">
          <div className="aboutUs_containerBoxLeft">
            <div className="aboutUs_heading">
              <p> About Us </p>
            </div>
            <div className="aboutUs_textHead">
              <h1>Care At Home A New Era for OldHouse & DayCare</h1>
            </div>
            <div className="aboutUs_textBody">
              <p>
                Here we cater the Unique needs of both cherished Seniors and
                Energetic Little Ones. Imagine the comfort of an Old Age Home
                and the vibrant atmosphere of a DayCare, all tailored to thrive
                within the familiar walls of your Home.
              </p>
            </div>
          </div>
          <div className="aboutUs_containerBoxRight">
            <div className="aboutUs_containerBoxRightUp">
              <div className="aboutUs_containerBoxRightUpFirst">
                <div className="aboutUs_containerBoxRightUpImage">
                  <FontAwesomeIcon icon={faHandsHoldingChild} />
                </div>
                <div className="aboutUs_containerBoxRightUpHead">
                  <p>Child Care</p>
                </div>
                <div className="aboutUs_containerBoxRightUpText">
                  <p>Flexible child care options, full or part-time</p>
                </div>
              </div>
              <div className="aboutUs_containerBoxRightUpSecond">
                <div className="aboutUs_containerBoxRightUpImage">
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <div className="aboutUs_containerBoxRightUpHead">
                  <p>Global Services</p>
                </div>
                <div className="aboutUs_containerBoxRightUpText">
                  <p>Tailored methods for diverse, dynamic requirements.</p>
                </div>
              </div>
              <div className="aboutUs_containerBoxRightUpThird">
                <div className="aboutUs_containerBoxRightUpImage">
                  <FontAwesomeIcon icon={faHandHoldingHeart} />
                </div>
                <div className="aboutUs_containerBoxRightUpHead">
                  <p>Qualified Caregivers</p>
                </div>
                <div className="aboutUs_containerBoxRightUpText">
                  <p>
                    Trained and certified professionals ensuring top-notch care.
                  </p>
                </div>
              </div>
            </div>

            <div className="aboutUs_containerBoxRightDown">
              <div className="aboutUs_containerBoxRightDownFirst">
                <div className="aboutUs_containerBoxRightDownImage">
                  <FontAwesomeIcon icon={faMapPin} />
                </div>
                <div className="aboutUs_containerBoxRightDownHead">
                  <p>Care Takers</p>
                </div>
                <div className="aboutUs_containerBoxRightDownText">
                  <p>
                    By choosing local providers, we contribute to the growth of
                    local community.
                  </p>
                </div>
              </div>
              <div className="aboutUs_containerBoxRightDownSecond">
                <div className="aboutUs_containerBoxRightDownImage">
                  <FontAwesomeIcon icon={faHouseUser} />
                </div>
                <div className="aboutUs_containerBoxRightDownHead">
                  <p>Home Care</p>
                </div>
                <div className="aboutUs_containerBoxRightDownText">
                  <p>Skilled attention in comfort of your home</p>
                </div>
              </div>
              <div className="aboutUs_containerBoxRightDownThird">
                <div className="aboutUs_containerBoxRightDownImage">
                  <FontAwesomeIcon icon={faClipboard} />
                </div>
                <div className="aboutUs_containerBoxRightDownHead">
                  <p>Tailored Plans</p>
                </div>
                <div className="aboutUs_containerBoxRightDownText">
                  <p>
                    Customized schedules designed to seamlessly integrate with
                    your daily routine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default aboutUs;
