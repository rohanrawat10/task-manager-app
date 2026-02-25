import React from 'react'
import newImage from "../assets/newImage.jpg"
function AuthLayout({children}) {
  return (
    <div className='flex h-screen overflow-hidden'>
        <div className='w-full md:w-1/2 overflow-y-auto'>
            <div className='w-full min-h-full flex flex-col px-12 pt-8 pb-12 '>
             <div className='flex-grow w-full  items-center justify-center'>
               {children}
             </div>
            </div>
        </div>
            <div className='w-full md:w-1/2'>
                <img src={newImage} 
                alt='login background'
                className="h-full w-full object-cover"/>
            </div>

    </div>
  )
}

export default AuthLayout