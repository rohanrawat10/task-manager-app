import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { TfiMenu } from 'react-icons/tfi'
import SideMenu from './SideMenu'
import { useSelector } from 'react-redux'

function Navbar({activeMenu}){
  const [openSideMenu,setOpneSideMenu] = useState(false)

  return (
    <div className='bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between'>
     <div className='flex items-center space-x-4'>
      <button
       className='p-2 rounded-md text-gray-700 hover:text-gray-900 
      hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
      transition-colors lg:hidden '
      onClick={()=>setOpneSideMenu(prev=>!prev)}
      >
          {
            openSideMenu ? (<IoMdClose className='text-2xl'/>):(<TfiMenu className='text-2xl'/>)
          }
      </button>
      
     </div>
      <h2 className='text-xl font-semibold text-gray-800'>Expenss Tracker</h2>
      {
        openSideMenu && (
          <div className='fixed inset-0 z-40 flex lg:hidden'>
          <div className='relative z-50 w-72 h-full bg-white shadow-xl'>
            <button className='absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-gray-900
               hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
            '  onClick={()=>setOpneSideMenu(false)}>
              <IoMdClose className='text-2xl'/>
              </button>
                <div className='pt-16'>
            <SideMenu activeMenu={activeMenu}/>
         
            </div>
                 </div>
            </div>
        )
      }
    </div>
  )
}

export default Navbar