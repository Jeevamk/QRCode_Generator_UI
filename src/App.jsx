
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ImageShow from "./components/ImageShow";

function App() {
  return (
    <Router>
      <div className="justify-center items-center h-vh">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/:userId" element = {<ImageShow />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

