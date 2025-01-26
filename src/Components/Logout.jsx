import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.clear();
    navigate("/login")
  }
  return (
    <div className=' flex justify-center items-center h-full'>
        
        <div className='w-[400px] h-[180px] rounded-lg border -mt-48 -ml-48 px-6 py-4 flex flex-col gap-2'>

            <h1 className='text-2xl font-semibold'>Logout</h1>
            <p>Are you sure you want to logout</p>
            <div className='flex justify-end gap-4 mt-6'>
                <button onClick={(logout)} className='bg-red-600 text-white cursor-pointer font-semibold px-4 py-2 rounded-lg'>Logout</button>
                <button onClick={()=>navigate("/dashboard")} className='bg-black text-white cursor-pointer font-semibold px-4 py-2 rounded-lg'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Logout
