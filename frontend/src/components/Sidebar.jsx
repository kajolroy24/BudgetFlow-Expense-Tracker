import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { LuLayoutGrid, LuPiggyBank, LuHandCoins, LuShieldCheck, LuLogOut } from 'react-icons/lu'
import { PiUserCircle } from "react-icons/pi";
import { AppContext } from '../context/AppContext';
import { FaMoon } from 'react-icons/fa';
import { RiSunFill } from "react-icons/ri";

const Sidebar = ({ setShowMenu, showMenu }) => {

  const { token, setToken, navigate, darkMode, setDarkMode } = useContext(AppContext)

  const closeSidebar = () => {
    setShowMenu(false);
  };

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const menulist = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LuLayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: LuPiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: LuHandCoins,
      path: '/dashboard/expenses'
    },
    // {
    //   id: 4,
    //   name: 'Upgrade',
    //   icon: LuShieldCheck,
    //   path: '/dashboard/upgrade'
    // }
  ]

  return (
    <div className='min-h-screen py-5 pr-8 border-r border-gray-200 dark:bg-[#211641] dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <img onClick={() => navigate('/dashboard')} className='ml-5' src={assets.logo} alt="logo" height={100} width={190} />
        {showMenu && (
          <img className='w-5 md:hidden' onClick={() => setShowMenu(false)} src={`${darkMode ? assets.close_icon_dark : assets.close_icon_light}`} alt="" />
        )}
      </div>
      <div className='mt-12'>

        {menulist.map((menu, index) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            end={menu.path === '/dashboard'} // Applies "end" only for the dashboard
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex gap-2 items-center text-gray-500 dark:text-[#B5B0C7] font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-primary hover:bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200
              dark:hover:bg-linear-to-r dark:from-cyan-900/20 dark:via-blue-900/30 dark:to-indigo-900/40

              ${isActive ? 'text-primary dark:text-primary bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200' : ''}`}>
            <menu.icon className="w-6 h-6" />
            {menu.name}
          </NavLink>
        ))}

      </div>

      <hr className="ml-6 mt-4 mb-4 border-gray-300" />

      {/* Dark Mode Toggle */}
      <div className="flex gap-2 items-center fixed bottom-10 px-6 py-5">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)} // Toggle dark mode on change
              className="sr-only"
            />
            <div className="w-14 h-6.75 bg-purple-200 rounded-full"></div>
            <div className={`dot absolute top-1 left-1 w-5 h-5 bg-primary rounded-full transition ${darkMode ? 'transform translate-x-7' : ''}`}>
                    {/* Sun icon for light mode and Moon icon for dark mode */}
            {darkMode ? (
              <FaMoon className="text-white w-2.5 h-2.5 absolute top-0 left-0 transform translate-x-1/2 translate-y-1/2" />
            ) : (
              <RiSunFill className="text-white w-3 h-3 absolute top-0 left-0 transform translate-x-1/3 translate-y-1/3" />
            )}
            </div>
          </div>
          <span className="ml-2 text-gray-700 dark:text-[#B5B0C7]">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </label>
      </div>

      <NavLink
        to={'/dashboard/profile'}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `flex gap-2 items-center text-gray-500 dark:text-[#B5B0C7]  font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-primary hover:bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200
            dark:hover:bg-linear-to-r dark:from-cyan-900/20 dark:via-blue-900/30 dark:to-indigo-900/40
              ${isActive ? 'text-primary dark:text-primary bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200' : ''}`}>
        <PiUserCircle className='w-6.5 h-6.5' />
        <p>Profile</p>
      </NavLink>

      <div
        className="flex gap-2 items-center text-gray-500 dark:text-[#B5B0C7]  font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-red-500 hover:bg-red-100 hover:dark:bg-red-900/30"
        onClick={logout}
      >
        <LuLogOut className='w-6 h-6' />
        <p>Logout</p>
      </div>
    </div>

  )
}

export default Sidebar