import React from 'react'

const userHome:React.FC = () => {
  return (
   <>
    <div className='w-screen bg-red-100 h-screen flex justify-center items-center  '> 
        <div className=" w-40 h-20">
            <img className="rounded-full border border-gray-100 shadow-sm" src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=800" alt="user image" />
            <h1 className='text-gray-400  text-6xl'>welcome home</h1>
         </div>
    </div>
   </>
  )
}

export default userHome