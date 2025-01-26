import React from 'react'

function Navbar() {
  return (
    <div className='shadow h-[60px]'>
        <div className='w-11/12 h-full mx-auto flex justify-between items-center'>
              <div>
                <img src="https://static.thenounproject.com/png/1336209-200.png"  className='w-[40px] h-[40px] cursor-pointer' alt="" /> 
              </div>

              <div className='flex gap-8 font-semibold'>
                <button className='cursor-pointer'>Home </button>
                <button className='cursor-pointer'>About </button>
                <button className='cursor-pointer'>Contact </button>
                <button className='cursor-pointer'>Explore</button>

              </div>

              <div>
                <img src="https://png.pngtree.com/png-clipart/20240709/original/pngtree-casual-man-flat-design-avatar-profile-picture-vector-png-image_15526568.png" className='cursor-pointer w-[40px] h-[40px]' alt="" />
              </div>
        </div>
    </div>
  )
}

export default Navbar
