
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <AllRoutes />
      <Footer/>
    </div>
  );
}

export default App;
