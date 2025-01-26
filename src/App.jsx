import Homepage from "./Components/Homepage"
import Navbar from "./Components/Navbar"
import { Routes, Route } from "react-router-dom"
import StudentDashboard from "./Components/StudentDashboard"
import Logout from "./Components/Logout"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import BasicHomepage from "./Components/BasicHomepage"

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={token !== undefined ? <Homepage /> : <LoginPage />}>
          <Route path="/" element={<BasicHomepage />} />
          <Route path="/dashboard" element={token !== undefined ? <StudentDashboard /> : <LoginPage />} />
          <Route path="/logout" element={token !== undefined ? <Logout /> : <LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
