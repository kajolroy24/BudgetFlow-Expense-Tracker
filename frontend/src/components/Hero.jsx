import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className='bg-gray-50 flex items-center flex-col'>
            <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Manage your Money with AI-driven Personal <br />
              <span className="text-4xl text-blue-800 md:text-[8rem] font-bold mt-1 leading-none">
                Finance Advisor
              </span>
            </h1>
          </>
        }
      >
        <img
          src={assets.dashboard}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </section>
  )
}

export default Hero