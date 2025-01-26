import Homepage from "./Components/Homepage"
import Navbar from "./Components/Navbar"
import {Routes, Route} from "react-router-dom"
import StudentDashboard from "./Components/StudentDashboard"
import Logout from "./Components/Logout"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
function App() {
  
  const token = localStorage.getItem("token")
  console.log("token",token)
  return (
    <div>

      <Navbar/>

      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/" element={token ? <Homepage/> : <LoginPage/>}>
            <Route path="/dashboard" element={token ? <StudentDashboard/> : <LoginPage/>}/>
            <Route path="/logout" element={token ? <Logout/> : <LoginPage/>}/>
          </Route>
      </Routes>
      
    </div>
  )
}

export default App
