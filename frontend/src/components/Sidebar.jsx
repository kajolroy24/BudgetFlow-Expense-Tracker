import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { LuLayoutGrid, LuPiggyBank, LuHandCoins, LuShieldCheck } from 'react-icons/lu'

const Sidebar = () => {

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
      path: '/dashboard/expenses/:budgetId'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: LuShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]

  return (
    <div className='h-screen p-5 border border-gray-200 shadow-sm'>
      <img src={assets.logo} alt="logo" height={100} width={160} />
      <div className='mt-5'>

        {menulist.map((menu, index) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            end={menu.path === '/dashboard'} // Applies "end" only for the dashboard
            className={({ isActive }) =>
              `flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md mb-2 hover:text-primary hover:bg-blue-100 
              ${isActive ? 'text-primary bg-blue-100' : ''}`}>
            <menu.icon className="w-6 h-6" />
            {menu.name}
          </NavLink>
        ))}

      </div>
      <div className='flex gap-2 items-center fixed bottom-10 p-5'>
        {/* <UserButton /> */}
        Profile
      </div>
    </div >
  )
}

export default Sidebar