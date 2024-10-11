import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import Auth from "../hoc/auth.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Auth SpecificComponent={LandingPage} option={null} />} />
          <Route exact path="/login" element={<Auth SpecificComponent={LoginPage} option={false} />} />
          <Route exact path="/register" element={<Auth SpecificComponent={RegisterPage} option={null} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
