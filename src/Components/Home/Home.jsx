import Header from "../Header/header";
import HomeInterface from "../HomeInterface/homeInterface";
import AboutUs from "../AboutUs/aboutUs";
import FAQs from "../FAQs/FAQs";
import ContactUs from "../ContactUs/contactUs";
import Footer from "../Footer/footer";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import ProfileSearch from "../ViewProfile/profileSearch";
import { CareTakerChatboxContainer } from "../Chatbox/chatbox";

const Home = ({ updateLogInStatus, userInfo, setUserInfo }) => {
  console.log("Home userInfo: ", userInfo);

  return (
    <div>
      <Header userInfo={userInfo} updateLogInStatus={updateLogInStatus} />

      <Routes>
        <Route
          path="/"
          element={
            <HomeInterface userInfo={userInfo} setUserInfo={setUserInfo} />
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contactus" element={<ContactUs />} />
        {userInfo.roleId > 0 && (
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
        )}
        {userInfo.roleId === 2 && <Route path="caretakers" element={<ProfileSearch userInfo={userInfo} />} />}
      </Routes>

      {userInfo.roleId ===3 && <CareTakerChatboxContainer senderInfo={userInfo} />}

      <Footer />
    </div>
  );
};

export default Home;
