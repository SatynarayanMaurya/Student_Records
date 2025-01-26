
import React from 'react'
function Spinner() {
  return (
    <div className='h-[106vh] flex items-center justify-center -mt-10 fixed inset-0 bg-black  opacity-70 backdrop-filter backdrop-blur-sm z-10'>
        <div  className=''>
            <img src="https://i0.wp.com/www.watan.foundation/wp-content/uploads/2021/05/loading-gif-png-5.gif?quality=90&strip=all&ssl=1" alt="" width={250} />

        </div>
    </div>
  )
}

export default Spinner
