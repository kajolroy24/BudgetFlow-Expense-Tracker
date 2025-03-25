import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { LuLayoutGrid, LuPiggyBank, LuHandCoins, LuShieldCheck, LuLogOut } from 'react-icons/lu'
import { PiUserCircle } from "react-icons/pi";
import { AppContext } from '../context/AppContext';

const Sidebar = () => {

  const {token, setToken, navigate} = useContext(AppContext)

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
    <div className='min-h-screen py-5 pr-8 border-r border-gray-200'>
      <img className='ml-5' src={assets.logo} alt="logo" height={100} width={160} /> 
      <div className='mt-12'>

        {menulist.map((menu, index) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            end={menu.path === '/dashboard'} // Applies "end" only for the dashboard
            className={({ isActive }) =>
              `flex gap-2 items-center text-gray-500 font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-primary hover:bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200
              ${isActive ? 'text-primary bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200' : ''}`}>
            <menu.icon className="w-6 h-6" />
            {menu.name}
          </NavLink>
        ))}

      </div>

      <hr className="my-4 border-gray-300" />
      {/* 
      <div className='flex gap-2 items-center fixed bottom-10 p-5'>
        Profile
      </div> */}

      <NavLink
        to={'/dashboard/profile'}
        className={({ isActive }) =>
          `flex gap-2 items-center text-gray-500 font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-primary hover:bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200
              ${isActive ? 'text-primary bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-200' : ''}`}>
        <PiUserCircle className='w-7 h-7' />
        <p>Profile</p>
      </NavLink>

      <div
        className="flex gap-2 items-center text-gray-500 font-medium py-4 px-6 cursor-pointer rounded-r-3xl mb-2 hover:text-red-500 hover:bg-red-100"
        onClick={logout}
      >
        <LuLogOut className='w-6 h-6' />
        <p>Logout</p>
      </div>
    </div>

  )
}

export default Sidebar