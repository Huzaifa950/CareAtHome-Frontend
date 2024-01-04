import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer touchStart={false} onWheel={false} />
      <AllRoutes />
    </div>
  );
}

export default App;