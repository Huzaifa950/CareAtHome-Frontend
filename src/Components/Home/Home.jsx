import { ApiGetCall } from "../ApiCall/ApiCalls";
import { showSuccessToast } from "../Toast/ToastifyToast";
// import Header from "../Header/header";
// import Footer from "../Footer/footer";
// import HomeInterface from "../HomeInterface/homeInterface";
import AboutUs from "../AboutUs/aboutUs"

const Home = ({updateLogInStatus, userInfo})=>{

    const handleLogOut = async ()=>{
        try{
            await ApiGetCall('/logout');
            showSuccessToast("Logged Out Successfully")
            updateLogInStatus(false);
        }catch(error){
            console.error("error /logout", error);
        }
    } 
    // return(
    //     <div>
    //         <Header />
    //         {/* <h1>Header</h1> */}
    //         <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>
    //     </div>
    // )

    // return (
    //     <div>
    //         <HomeInterface />
    //         {/* <h1>Home</h1> */}
    //         <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>
    //     </div>
    // )

    return(
        <div>
            <AboutUs />
            {/* <h1>About Us</h1> */}
            <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>
        </div>
    )


    // return(
    //     <div>
    //         <Footer />
    //         {/* <h1>Footer</h1> */}
    //         <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>
    //     </div>
    // )
}

export default Home