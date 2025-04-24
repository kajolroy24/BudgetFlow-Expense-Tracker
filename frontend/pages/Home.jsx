import React, { useContext } from 'react'
import { AppContext } from '../src/context/AppContext.jsx'
import Hero from '../src/components/Hero'
import Navbar from '../src/components/Navbar'
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from '../src/assets/landing.js'
import {
  LuChartColumn,
  LuReceiptText,
  LuChartPie,
  LuUserRound,
  LuZap,
  LuTrendingUp,
  LuHandCoins,
  LuLightbulb,
  LuShoppingBag,
} from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { toast } from 'react-toastify'


const Home = () => {

  const { navigate, token } = useContext(AppContext)

  const goToDashboard = async () => {
    if (!token) {
      toast.warn('Login to Create Budgets')
      return navigate('/login')
    } else {
      return navigate('/dashboard')
    }
  }

  const iconMap = {
    LuChartColumn: LuChartColumn,
    LuChartPie: LuChartPie,
    LuTrendingUp: LuTrendingUp,
    LuZap: LuZap,
    LuUserRound: LuUserRound,
    LuHandCoins: LuHandCoins,
    LuLightbulb: LuLightbulb,
    LuShoppingBag: LuShoppingBag
  }

  return (
    <>
      <Navbar />
      <div className='relative flex items-center flex-col min-h-screen overflow-y-auto bg-white dark:bg-[#140a2c] bg-gradient-to-br from-[#E760D4]/15 via-[#3ECFCA]/15 to-[#7B61FF]/15 z-10'>

        {/* Fixed grid background */}
        <div className='bg-grid-pattern absolute top-0 left-0 w-full h-full z-0' />

        <div className="relative z-10 w-full">
          <Hero />
          {/* Features Section */}
          <section className="w-full bg-purple-50/50 dark:bg-purple-700/10 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl dark:text-white font-bold text-center mb-12">
                Everything you need to manage your finances
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {featuresData.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <div
                      key={index}
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-primary transition-colors duration-300"
                    >
                      <div className="py-6 px-4 flex flex-col items-center justify-center text-center">
                        {IconComponent && <IconComponent className="h-10 w-10 text-primary mb-4" />}
                        <h3 className="text-xl dark:text-white font-bold mb-2">{feature.title}</h3>
                        <p className='dark:text-[#B5B0C7]'>{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto text-center gap-8">
                {statsData.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-[#B5B0C7]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full bg-purple-50/50 dark:bg-purple-700/10 py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl dark:text-white font-bold mb-4">How It Works</h2>
                {/* <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {howItWorksData.map((step, index) => {
                  const IconComponent = iconMap[step.icon];
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                      </div>
                      <h3 className="font-semibold text-xl dark:text-white">{step.title}</h3>
                      <p className="text-muted-foreground dark:text-[#B5B0C7]">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="w-full py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl dark:text-white font-bold text-center mb-12">
                What Our Users Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonialsData.map((testimonial, index) => (
                  <div key={index} className="p-6 bg-white dark:bg-[#211641] dark:border-none border-1 border-gray-200 rounded-2xl">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <img
                            width={40}
                            height={40}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white">{testimonial.name}</p>
                          <p className="text-sm text-gray-700 dark:text-[#B5B0C7]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-muted-foreground italic relative dark:text-[#B5B0C7]">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          < section className="py-20 bg-gradient-to-tr from-indigo-500 to-purple-400 dark:bg-gradient-to-tr dark:from-indigo-600 dark:to-purple-500 rounded-lg" >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their finances
                smarter with BudgetFlow
              </p>
              <button onClick={goToDashboard} className="bg-white text-primary px-4 py-2.5 text-sm rounded-full font-light hover:bg-violet-500' animate-bounce">
                Start Free Trial
              </button>
            </div>
          </ section>
        </div>
      </div>
    </>
  )
}

export default Home