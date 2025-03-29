import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const DashboardNav = () => {

  const { token, userData, navigate } = useContext(AppContext)

  return (
    <div className='py-4 px-8 border-b border-gray-200 flex items-center justify-end'>
      <div onClick={() => navigate('/dashboard/profile')} className='flex items-center justify-end'>
        <button className='hidden md:flex items-center'>
          <img className='w-11 rounded-full mr-3' src={userData.image} alt="image" />
          <span className='font-light text-left text-[15px]'><p className='font-medium capitalize'>{userData.name}</p><p>{userData.email}</p></span>
        </button>
      </div>
    </div>



  )
}

export default DashboardNav