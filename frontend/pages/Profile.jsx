import React, {useContext, useState} from 'react'
import { AppContext } from '../src/context/AppContext'
import {assets} from '../src/assets/assets.js'
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

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
  
        const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers: {token}})
  
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
              ? <p>Edit Profile</p>
              : <p className='text-gray-700 text-3xl font-bold'>Your Profile</p>
          }
        <div className='p-10 mt-7 bg-white rounded-2xl w-full flex flex-col min-h-screen gap-2'>    
          {
            isEdit
            ? <label htmlFor='image'>
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            : <img className='w-30 rounded-full' src={userData.image} alt="" />
          }
    
          {
            isEdit
              ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
              : <p className='font-medium capitalize text-3xl text-neutral-800 mt-4'>{userData.name}</p>
          }
    
          <hr className='bg-zinc-400 h-[1px] border-none' />
          <div>
            <div className='flex items-center mt-3'>
              <FaPhoneAlt className='text-primary mr-2' />
              <p className='text-gray-700 text-lg font-medium'>Contact Information</p>
            </div>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Email id:</p>
              <p className='text-blue-500'>{userData.email}</p>
              <p className='font-medium'>Phone:</p>
              {
                isEdit
                  ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                  : <p className='text-blue-400'>{userData.phone}</p>
              }
            </div>
          </div>
          <div>
          <div className='flex items-center mt-3'>
              <FaUser className='text-primary mr-2' />
              <p className='text-gray-700 text-lg font-medium'>Basic Information</p>
            </div>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Gender:</p>
              {
                isEdit
                ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}) )} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                : <p className='text-gray-400'>{userData.gender}</p>
              }
              <p className='font-medium'>Date of Birth:</p>
              {
                isEdit
                ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                : <p className='text-gray-400'>{userData.dob}</p>
              }
            </div>
          </div>
    
          <div className='mt-10'>
            {
              isEdit
              ? <button className='border border-primary text-primary bg-purple-100 px-8 py-2 rounded-xl hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save information</button>
              : <button className='border border-primary text-primary bg-purple-100 px-8 py-2 rounded-xl hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
            }
          </div>
    
        </div>
      </div>
    )
}

export default Profile