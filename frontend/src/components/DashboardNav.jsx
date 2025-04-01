import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'

const DashboardNav = () => {

  const { token, setToken, userData, navigate } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='py-4 px-8 border-b border-gray-200 flex items-center justify-between relative' >
      <div>
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden transition-transform duration-300' src={assets.menu_icon} alt="menu" />
        {/* Mobile Menu  */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden left-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <Sidebar setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>
      </div>
      <div onClick={() => navigate('/dashboard/profile')} className=''>
        <button className='hidden md:flex items-center justify-between'>
          <img className='w-11 rounded-full mr-3' src={userData.image} alt="image" />
          <span className='font-light text-left text-[15px]'><p className='font-medium capitalize'>{userData.name}</p><p>{userData.email}</p></span>
        </button>
      </div>
    </div>
  )
}

export default DashboardNav