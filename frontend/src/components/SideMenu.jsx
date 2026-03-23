import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from '../utils/data'

function SideMenu({ activeMenu }) {
  const [SideMenuData, setSideMenuData] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (route) => {
    // Check if this is logout route
    if (route === '/logout') {
      handleLogOut()
      return
    }
    navigate(route)
  }

  const handleLogOut = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sign-out`, {
        withCredentials: true
      })
      if (result.data) {
        dispatch({ type: 'SIGN_OUT_SUCCESS' }) 
        navigate("/login")
      }  
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setSideMenuData(currentUser?.role === "admin" ? SIDE_MENU_DATA : USER_SIDE_MENU_DATA)
    }
  }, [currentUser])

  return (
    <div className='w-64 lg:p-6 h-full flex flex-col lg:border-r lg:border-gray-200'>
      {/* Profile Section */}
      <div className='flex flex-col items-center mb-8'>
        <div className='w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-4 border-2 border-blue-200'>
          {currentUser?.profileImageUrl ? (
            <img 
              src={currentUser.profileImageUrl} 
              alt="Profile Image"
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center'>
              <span className='text-white font-semibold text-sm'>
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>
        
        {currentUser?.role === "admin" && (
          <div className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2'>
            Admin
          </div>
        )}
        
        <h5 className='text-lg font-semibold text-gray-800'>{currentUser?.name || "User"}</h5>
        <p className='text-sm text-gray-500'>{currentUser?.email || ""}</p>
      </div>

      {/* Menu Items */}
      <div className='flex-1 overflow-y-auto'>
        {SideMenuData.map((item, index) => (
          <button 
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] rounded-xl transition-all duration-200
              ${activeMenu === item.label 
                ? "text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm" 
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
              py-3 px-6 mb-3 cursor-pointer font-medium`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl ${activeMenu === item.label ? 'text-blue-600' : 'text-gray-500'}`} />
            <span>{item.label}</span>
          </button>
        ))}
        
        {/* Logout Button */}
        <button
          className="w-full flex items-center gap-4 text-[15px] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-3 px-6 mb-3 cursor-pointer font-medium transition-all duration-200"
          onClick={handleLogOut}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default SideMenu
