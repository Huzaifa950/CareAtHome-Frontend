import Header from "../Header/header";
import HomeInterface from "../HomeInterface/homeInterface";
import AboutUs from "../AboutUs/aboutUs";
import FAQs from "../FAQs/FAQs";
import ContactUs from "../ContactUs/contactUs"
import Footer from "../Footer/footer";
import { Route, Routes } from "react-router-dom";

// import { Button, Dropdown, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";
// =======
import Profile from "../Profile/Profile";
// >>>>>>> c1a61ff96e72458651492f8f71c8ed5c6ba85215

const Home = ({ updateLogInStatus, userInfo }) => {

    return (
        <div>
            <Header userInfo={userInfo} updateLogInStatus={updateLogInStatus} />

            <Routes>
                <Route path="/" element={<HomeInterface />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />
        </div>
    )

}

export default Home