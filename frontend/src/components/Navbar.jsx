import { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {

    const { token, setToken, userData, navigate } = useContext(AppContext)

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
        <div className='bg-white p-5 fixed w-full z-20 top-0 start-0 flex justify-between items-center border border-gray-200 shadow-xs'>
            <img onClick={() => navigate('/')} src={assets.logo} alt='logo' width={160} height={100} />
            <div className='flex items-center gap-4'>
                <button onClick={goToDashboard} className='px-4 py-2.5 text-sm rounded-full border border-gray-300 font-light hidden md:block hover:bg-gray-100'>Dashboard</button>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <button className='px-4 py-1 text-sm rounded-full border items-center justify-around border-gray-300 font-light hidden md:flex hover:bg-gray-100'>
                            <img className='w-10 rounded-full' src={userData.image} alt="image" />
                                <span className='text-sm'><p className='font-semibold capitalize'>{userData.name}</p><p className='font-light'>{userData.email}</p></span>
    
                                <img className='w-2.5' src={assets.dropdown_icon} alt="icon" />
                            </button>
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
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