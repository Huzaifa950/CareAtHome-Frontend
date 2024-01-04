import { ApiGetCall } from "../ApiCall/ApiCalls";
import { showSuccessToast } from "../Toast/ToastifyToast";

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
    return(
        <div>
            <h1>Home</h1>
            <button style={{padding: "20px"}} onClick={handleLogOut}>LogOut</button>
        </div>
    )
}

export default Home