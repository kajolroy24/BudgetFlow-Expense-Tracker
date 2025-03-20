import React from 'react'
import { LuPiggyBank, LuHandCoins } from 'react-icons/lu'
import { GiTwoCoins } from "react-icons/gi";

const Cards = ({ budgets, totalBudget, totalExpenses }) => {

    return (

        <div>
            {
            budgets.length > 0
                ? <div className= 'mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='p-7 w-3xs bg-white border border-gray-200 rounded-2xl flex items-center justify-between'>
                        <div>
                            <h2 className='font-semibold text-lg text-gray-700'>Total Budget</h2>
                            <h2 className='font-bold text-2xl mt-5'>₹{totalBudget}</h2>
                        </div>
                        <LuPiggyBank className='bg-purple-100 p-3 h-12 w-12 rounded-full text-primary outline-2 outline-primary' />
                    </div>
                    <div className='p-7 w-xs bg-white border border-gray-200 rounded-2xl'>
                        <div className=' flex items-center justify-between'>
                            <h2 className='font-semibold text-lg text-gray-700'>Total Spent</h2>
                            <LuHandCoins className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                        </div>
                        <h2 className='font-semibold text-3xl mt-2'>₹{totalExpenses}</h2>
                    </div>
                    <div className='p-7 w-xs bg-white border border-gray-200 rounded-2xl flex items-center justify-between'>
                        <div>
                            <h2 className='font-medium text-xl text-gray-700'>No of Budgets</h2>
                            <h2 className='font-bold text-2xl mt-2'>{budgets.length}</h2>
                        </div>
                        <GiTwoCoins className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                </div>
                :
                <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[1, 2, 3].map((item, index) => (
                        <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Cards