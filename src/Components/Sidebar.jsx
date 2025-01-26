import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col h-[89vh]'>
        
        <button onClick={()=>navigate("/dashboard")} className='py-3 cursor-pointer border-b hover:bg-orange-400 hover:text-white  font-semibold transition-all duration-200'>Student Dashboard</button>
        <button onClick={(()=>navigate("/logout"))} className='py-3 cursor-pointer border-b hover:bg-yellow-300  font-semibold transition-all duration-200'>Logout</button>
    </div>
  )
}

export default Sidebar
