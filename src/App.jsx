import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ypreg from "./pages/Ypreg";
import AllEventsClient from "./pages/AllEventsClient";

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/yp" element={<Ypreg />} />
        <Route exact path="/allevents" element={<AllEventsClient />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App