import React from 'react'
import { LuPiggyBank, LuHandCoins } from 'react-icons/lu'
import { GiTwoCoins } from "react-icons/gi";

const Cards = ({ budgets, totalBudget, totalExpenses }) => {

    return (

        <div>
            {
            budgets.length > 0
                ? <div className= 'mt-7 flex flex-wrap gap-6'>
                    <div className='p-7 w-3xs bg-white border border-gray-200 rounded-2xl'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-medium text-lg text-gray-700'>Total Budget</h2>
                        <LuPiggyBank className='bg-purple-100 text-primary p-3 h-12 w-12 rounded-full' />
                        </div>
                            <h2 className='font-medium text-3xl mt-2'>₹{totalBudget}</h2>
                    </div>
                    <div className='p-7 w-3xs bg-white border border-gray-200 rounded-2xl'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-medium text-lg text-gray-700'>Total Spent</h2>
                        <LuHandCoins className='bg-purple-100 text-primary p-3 h-12 w-12 rounded-full' />
                        </div>
                            <h2 className='font-medium text-3xl mt-2'>₹{totalExpenses}</h2>
                    </div>
                    <div className='p-7 w-3xs bg-white border border-gray-200 rounded-2xl'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-medium text-lg text-gray-700'>No of Budgets</h2>
                        <GiTwoCoins className='bg-purple-100 text-primary p-3 h-12 w-12 rounded-full' />
                        </div>
                            <h2 className='font-medium text-3xl mt-2'>{budgets.length}</h2>
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