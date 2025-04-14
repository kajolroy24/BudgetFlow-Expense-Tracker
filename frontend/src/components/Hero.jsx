import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { FaMoon } from 'react-icons/fa';
import { RiSunFill } from "react-icons/ri";

const Hero = () => {

  const {darkMode, setDarkMode} = useContext(AppContext)

  return (
    <section className='bg-gradient-to-br from-[#E760D4]/15 via-[#3ECFCA]/15 to-[#7B61FF]/15 bg-white dark:bg-[#140a2c] flex items-center flex-col'>
            <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Manage your Money with AI-driven Personal <br />
              <span className="text-4xl text-primary drop-shadow-[0px_0px_8px_rgba(144,106,240,0.9)] dark:drop-shadow-[0px_0px_10px_rgba(118,81,215,1)] md:text-[8rem] font-bold mt-1 leading-none">
                Finance Advisor
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`${darkMode ? assets.dashboard_dark : assets.dashboard_light}`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover w-full h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-10 right-6 z-50 p-3.5 rounded-full shadow-md bg-primary outline-none hover:scale-105 transition-transform"
      title="Toggle Dark Mode"
    >
      {darkMode ? <RiSunFill className='text-white w-4.5 h-4.5 hover:scale-105' /> : <FaMoon className='text-white w-4.5 h-4.5 hover:scale-105' /> }
    </button>
    </section>
  )
}

export default Hero