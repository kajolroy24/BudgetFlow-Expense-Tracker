import React, { useContext, useState } from 'react'
import { AppContext } from '../src/context/AppContext'
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {

        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return userData && (
    <div className='p-10'>
      {
        isEdit
          ? <p className='text-gray-700 dark:text-white text-3xl font-bold'>Edit Profile</p>
          : <p className='text-gray-700 dark:text-white text-3xl font-bold'>Your Profile</p>
      }
      <div className='p-10 mt-7 bg-white dark:bg-[#211641] rounded-2xl w-full flex flex-col gap-2'>
        {
          isEdit
            ? <div className='inline-block relative cursor-pointer'>
              <img className='w-30 aspect-square border-3 border-purple-200 rounded-full object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <div class="absolute bottom-0 start-20 inline-flex items-center justify-center w-11 h-11 text-xs font-bold text-white bg-primary border-2 border-white rounded-full dark:border-gray-900"
                onClick={() => document.getElementById('image').click()} >
                <MdEdit size={20} />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </div>
            : <img className='w-30 aspect-square border-3 border-purple-200 rounded-full object-cover' src={userData.image} alt="" />
        }

        {
          isEdit
            ? <input className='bg-purple-50 dark:bg-[#140a2c] dark:text-[#B5B0C7] focus:outline-none focus:border-primary focus:border-2 rounded-lg px-2 py-1 capitalize text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            : <p className='font-medium capitalize text-3xl dark:text-white text-gray-700 mt-4'>{userData.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px] border-none' />
        <div>
          <div className='flex items-center mt-3'>
            <FaPhoneAlt className='text-primary mr-2' />
            <p className='text-gray-700 dark:text-white text-lg font-medium'>Contact Information</p>
          </div>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-700'>
            <p className='font-medium dark:text-white'>Email id:</p>
            <p className='dark:text-[#B5B0C7]'>{userData.email}</p>
            <p className='font-medium dark:text-white'>Phone:</p>
            {
              isEdit
                ? <input className='bg-purple-50 dark:bg-[#140a2c] dark:text-[#B5B0C7] focus:outline-none focus:border-primary focus:border-2 rounded-lg px-2 py-1 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                : <p className='dark:text-[#B5B0C7]'>{userData.phone}</p>
            }
          </div>
        </div>
        <div>
          <div className='flex items-center mt-3'>
            <FaUser className='text-primary mr-2' />
            <p className='text-gray-700 dark:text-white text-lg font-medium'>Basic Information</p>
          </div>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-700'>
            <p className='font-medium dark:text-white'>Gender:</p>
            {
              isEdit
                ? <select className='bg-purple-50 dark:bg-[#140a2c] dark:text-[#B5B0C7] focus:outline-none focus:border-primary focus:border-2 rounded-lg p-1 max-w-21' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-gray-700 dark:text-[#B5B0C7]'>{userData.gender}</p>
            }
            <p className='font-medium dark:text-white'>Date of Birth:</p>
            {
              isEdit
                ? <input className='bg-purple-50 dark:bg-[#140a2c] dark:text-[#B5B0C7] focus:outline-none focus:border-primary focus:border-2 rounded-lg p-1 max-w-32' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                : <p className='text-gray-700 dark:text-[#B5B0C7]'>{userData.dob}</p>
            }
          </div>
        </div>

        <div className='mt-5'>
          {
            isEdit
              ? <div className='md:block'>
                <button className='text-white bg-primary px-8 py-2 md:mr-5 mb-5 mr-5 rounded-xl hover:bg-violet-500 transition-all' onClick={updateUserProfileData}>Save information</button>
                <button className='border border-primary text-primary bg-purple-100 dark:bg-[#372d54] px-8 py-2 rounded-xl hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Cancel</button>
              </div>
              : <button className='text-white bg-primary px-8 py-2 rounded-xl hover:bg-violet-500 transition-all' onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>

      </div>
    </div>
  )
}

export default Profile