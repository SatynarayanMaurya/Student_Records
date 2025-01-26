import Homepage from "./Components/Homepage"
import Navbar from "./Components/Navbar"
import {Routes, Route} from "react-router-dom"
import StudentDashboard from "./Components/StudentDashboard"
import Logout from "./Components/Logout"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import BasicHomepage from "./Components/BasicHomepage"
function App() {
  
  const token = localStorage.getItem("token")
<<<<<<< HEAD
=======

>>>>>>> c1193b4ebee42f7d3b01247c7a6fc5a1225d12b7
  return (
    <div>

      <Navbar/>

      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
<<<<<<< HEAD
          <Route path="/" element={token ? <Homepage/> : <LoginPage/>}>
            <Route path="/" element= {<BasicHomepage/>}/>
            <Route path="/dashboard" element={token ? <StudentDashboard/> : <LoginPage/>}/>
            <Route path="/logout" element={token ? <Logout/> : <LoginPage/>}/>
=======
          <Route path="/" element={token !== null ? <Homepage/> : <LoginPage/>}>
            <Route path="/dashboard" element={token !== null? <StudentDashboard/> : <LoginPage/>}/>
            <Route path="/logout" element={token!== null ? <Logout/> : <LoginPage/>}/>
>>>>>>> c1193b4ebee42f7d3b01247c7a6fc5a1225d12b7
          </Route>
      </Routes>
      
    </div>
  )
}

export default App
