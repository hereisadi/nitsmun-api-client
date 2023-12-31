import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ypreg from "./pages/Ypreg";
import AllEventsClient from "./pages/AllEventsClient";
import Admin from "./pages/Admin";
import YouthParlimentRegistrations from "./pages/YouthParlimentRegistrations";
import EditProfile from "./pages/EditProfile";
import AllRegisteredEvent from "./pages/AllRegisteredEvent";

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
          <Route exact path="/admin" element={<Admin />} />
          {/* <Route exact path="/registrations/:eventName" element={<YouthParlimentRegistrations />} /> */}
          <Route exact path="/registrations/YouthParliament" element={<YouthParlimentRegistrations />} />
          <Route exact path="/registrations/annual" element={<YouthParlimentRegistrations />} />

          <Route exact path="/edit" element={<EditProfile />} />
          <Route exact path="/event/YouthParliament" element={<AllRegisteredEvent />} />
        </Routes>
      </Router>

    </>
  )
}

export default App