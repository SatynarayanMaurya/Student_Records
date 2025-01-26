import React from 'react'
import Sidebar from './Sidebar'
import StudentDashboard from './StudentDashboard'
import Logout from './Logout'
import { Outlet } from 'react-router-dom'

function Homepage() {
  return (
    <div className='w-11/12 mx-auto mt-4'>

        <div className='flex justify-between'>

            <div className='w-[15%] border'>
                <Sidebar/> 
            </div>

            <div className='w-[84%] border'>
                <Outlet/>
            </div>

        </div>
    </div>
  )
}

export default Homepage
