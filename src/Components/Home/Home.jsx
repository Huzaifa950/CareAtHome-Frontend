import { ApiGetCall } from "../ApiCall/ApiCalls";
import { showSuccessToast } from "../Toast/ToastifyToast";
import Header from "../Header/header";
import HomeInterface from "../HomeInterface/homeInterface";
import AboutUs from "../AboutUs/aboutUs";
import FAQs from "../FAQs/FAQs";
import ContactUs from "../ContactUs/contactUs"
import Footer from "../Footer/footer";
import { Route, Routes } from "react-router-dom";
// import { Button, Dropdown, Nav, NavDropdown, Navbar, Stack } from "react-bootstrap";

const Home = ({ updateLogInStatus, userInfo }) => {

    return (
        <div>
            <Header userInfo={userInfo} updateLogInStatus={updateLogInStatus} />

            <Routes>
                <Route path="/" element={<HomeInterface />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>

            <Footer />
        </div>
    )

}

export default Home