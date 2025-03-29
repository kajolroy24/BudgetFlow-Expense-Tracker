import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { IoChevronDown } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { LuLogOut } from 'react-icons/lu'

const Navbar = () => {

    const { token, setToken, userData, navigate } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

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
        <div className='bg-white py-3 px-6 fixed w-full z-20 top-0 start-0 flex justify-between items-center border border-gray-200'>
            <img onClick={() => navigate('/')} src={assets.logo} alt='logo' width={160} height={100} />
            <div className='flex items-center gap-4'>
                <button onClick={goToDashboard} className='px-4 py-2.5 text-sm rounded-full border border-gray-300 font-light hidden md:block hover:bg-gray-100'>Dashboard</button>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <button className='hidden md:flex items-center border border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1.5'>
                                <img className='w-11 rounded-full mr-3' src={userData.image} alt="image" />
                                <span className='font-light text-left text-[15px] mr-2'>
                                    <p className='font-medium capitalize'>{userData.name}</p>
                                    <p className='font-light'>{userData.email}</p>
                                </span>
                                <IoChevronDown color='gray' size={15} />
                            </button>
                            <div className='absolute top-0 right-1 pt-18 font-medium text-gray-700 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col gap-4 p-4'>
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
                        :
                        <div>
                            <button onClick={() => navigate('/login')} className='bg-primary text-white px-4 py-2.5 text-sm rounded-full font-light hidden md:block hover:bg-indigo-700'>Get Started</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Navbar