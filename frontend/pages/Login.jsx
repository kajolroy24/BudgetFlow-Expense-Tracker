import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../src/context/AppContext';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  // https://assets.justinmind.com/wp-content/uploads/2024/06/login-page-example-the-cube-factory.png //reference

  const [state, setState] = useState('Sign Up')
  const { token, setToken, navigate, backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state

  // Validation state
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(password);
  };

  const validateForm = () => {
    let formErrors = {};

    if (state === 'Sign Up' && name.length < 3) {
      formErrors.name = 'Name should be at least 3 characters long.';
    }

    if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email.';
    }

    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post( backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post( backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message);
          console.log();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);


  return (
    <section className="bg-white pt-[5.25rem]">
      <div className="lg:grid lg:h-[90vh] lg:grid-cols-12 overflow-hidden">
        <div className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <form onSubmit={onSubmitHandler} className="w-sm max-w-xl lg:max-w-3xl">
            {
              state === "Sign Up" ? <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Create Your Account
              </h1>
                :
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome Back
                </h1>
            }
            <p className="mt-2.5 leading-relaxed text-gray-500">
              Please enter your details
            </p>
            {
              state === "Sign Up" && <div className='w-full mt-5'>
                <p>Full Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className={`border rounded w-full p-2 mt-1 focus:outline-none focus:border-primary focus:border-2 ${errors.name ? 'border-red-500' : 'border-zinc-300'
                    }`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            }
            <div className='w-full mt-5'>
              <p>Email</p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={`border rounded w-full p-2 mt-1 focus:outline-none focus:border-primary focus:border-2 ${errors.email ? 'border-red-500' : 'border-zinc-300'
                  }`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className='w-full mt-5'>
              <p>Password</p>
              <div className='flex'>
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`border rounded w-full p-2 mt-1 focus:outline-none focus:border-primary focus:border-2 ${errors.password ? 'border-red-500' : 'border-zinc-300'
                    }`}
                  required
                />
                {/* Eye Icon for toggling password visibility */}
                <span className="flex justify-around items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEye className="absolute mr-12 text-gray-400" size={20} /> : <FiEyeOff className="absolute mr-12 text-gray-400" size={20} />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {
              state === "Login" && <p className='text-primary mt-5 float-right underline cursor-pointer'>Forgot Password</p>
            }
            <button type='submit' className='bg-primary text-white w-full mt-5 py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
            {
              state === 'Sign Up'
                ? <p className='mt-5 text-center'>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer mt-5'>Login here</span></p>
                : <p className='mt-5 text-center'>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
            }
          </form>
        </main>

      </div>
    </section>

  )
}

export default Login