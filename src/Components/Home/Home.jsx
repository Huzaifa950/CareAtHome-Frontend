import { ApiGetCall } from "../ApiCall/ApiCalls";
import { showSuccessToast } from "../Toast/ToastifyToast";
import Header from "../Header/header";
import HomeInterface from "../HomeInterface/homeInterface";
import AboutUs from "../AboutUs/aboutUs";
import FAQs from "../FAQs/FAQs";
import ContactUs from "../ContactUs/contactUs"
import Footer from "../Footer/footer";
import { Route, Routes } from "react-router-dom";

const Home = ({ updateLogInStatus, userInfo }) => {

    const handleLogOut = async () => {
        try {
            await ApiGetCall('/logout');
            showSuccessToast("Logged Out Successfully")
            updateLogInStatus(false);
        } catch (error) {
            console.error("error /logout", error);
        }
    }

    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<HomeInterface />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>

            <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>

            <Footer />
        </div>
    )

}

export default Home