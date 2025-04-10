import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { IoChevronDown } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { LuLogOut } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const { token, setToken, userData, navigate, darkMode } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const isAuthenticated = token && userData;

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    const goToDashboard = async () => {
        if (!token) {
            toast.warn('Login to Create Budgets')
            return navigate('/login')
        } else {
            return navigate('/dashboard')
        }
    }

    return (
        <div className='bg-white dark:bg-[#211641] py-3 px-6 fixed w-full z-20 top-0 start-0 flex justify-between items-center border-b border-gray-200 dark:border-gray-700'>
            <img onClick={() => navigate('/')} src={assets.logo} alt='logo' width={190} height={100} />
            <div className='flex items-center'>
                <button onClick={goToDashboard} className='px-4 py-2.5 mr-4 text-sm rounded-full border border-primary text-primary bg-purple-100 dark:bg-[#140a2c] hover:bg-primary hover:text-white transition-all hidden md:block'>Dashboard</button>
                {
                    isAuthenticated
                        ? (<>
                            <div className='flex items-center cursor-pointer group relative'>
                                <button className='hidden md:flex items-center border border-gray-300 dark:border-gray-500 rounded-full px-1.5 py-1'>
                                    <img className='w-11 rounded-full mr-3' src={userData.image} alt="image" />
                                    <span className='font-light dark:text-white text-left text-[15px] mr-2'>
                                        <p className='font-medium capitalize'>{userData.name}</p>
                                        <p className='font-light'>{userData.email}</p>
                                    </span>
                                    <IoChevronDown color='gray' size={15} />
                                </button>
                                <div className='absolute top-0 right-1 pt-18 font-medium text-gray-700 z-20 hidden group-hover:block'>
                                    <div className='min-w-48 bg-purple-50 dark:bg-[#211641] dark:text-[#B5B0C7] rounded-2xl dark:border-gray-700 border border-purple-200 flex flex-col gap-4 p-4'>
                                        <div className='flex items-center hover:text-primary cursor-pointer'>
                                            <FaUser className='mr-3' />
                                            <p onClick={() => navigate('/dashboard/profile')} className='hover:text-primary cursor-pointer'>My Profile</p>
                                        </div>
                                        {/* <hr className='border-gray-300' /> */}
                                        <div className='flex items-center hover:text-red-500 cursor-pointer'>
                                            <LuLogOut className='w-5 h-5 mr-2' />
                                            <p onClick={logout}>Logout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={`${darkMode ? assets.menu_icon_dark : assets.menu_icon_light}`} alt="menu" />
                                {/* Mobile Menu  */}
                                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white dark:bg-[#211641] transition-all`}>
                                    <div className='flex items-center justify-between px-5 py-6'>
                                        <img className='w-36' src={assets.logo} alt="" />
                                        <img className='w-5' onClick={() => setShowMenu(false)} src={`${darkMode ? assets.close_icon_dark : assets.close_icon_light}`} alt="" />
                                    </div>
                                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg dark:text-[#B5B0C7] hover:text-primary font-medium'>
                                        <NavLink onClick={() => setShowMenu(false)} to={'/dashboard'}><p className='px-4 py-2 rounded inline-block cursor-pointer'>DASHBOARD</p></NavLink>
                                        <NavLink onClick={() => setShowMenu(false)} to={'/dashboard/profile'}><p className='px-4 py-2 rounded inline-block cursor-pointer'>PROFILE</p></NavLink>
                                        <div className='flex items-center hover:text-red-500 cursor-pointer' onClick={logout}>
                                            <p className='px-4 py-2'>LOGOUT</p>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                        </>)
                        :
                        (<div>
                            <button onClick={() => navigate('/login')} className='bg-primary text-white px-4 py-2.5 text-sm rounded-full font-light hover:bg-violet-500'>Get Started</button>
                        </div>)
                }

            </div>
        </div>

    )
}

export default Navbar