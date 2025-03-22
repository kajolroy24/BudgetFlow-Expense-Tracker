import React from 'react'
import { LuPiggyBank, LuHandCoins } from 'react-icons/lu'
import { GiTwoCoins } from "react-icons/gi";

const Cards = ({ budgets, totalBudget, totalExpenses }) => {

    return (

        <div>
            {
                budgets.length > 0
                    ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                         <div className='p-7 bg-white border border-gray-200 rounded-2xl flex items-center justify-between'>
                            <div>
                                 <h2 className='font-medium text-gray-700 mb-2'>Total Budget</h2>
                             <h2 className='font-medium text-3xl'>₹{totalBudget}</h2>
                            </div>
                            <LuPiggyBank className='bg-purple-100 text-primary p-3 h-13 w-13 rounded-full' />
                        </div>
                        <div className='p-7 bg-white border border-gray-200 rounded-2xl flex items-center justify-between'>
                            <div>
                                 <h2 className='font-medium text-gray-700 mb-2'>Total Spent</h2>
                             <h2 className='font-medium text-3xl'>₹{totalExpenses}</h2>
                            </div>
                            <LuHandCoins className='bg-purple-100 text-primary p-3 h-13 w-13 rounded-full' />
                        </div>
                        <div className='p-7 bg-white border border-gray-200 rounded-2xl flex items-center justify-between'>
                            <div>
                                 <h2 className='font-medium text-gray-700 mb-2'>No of Budgets</h2>
                             <h2 className='font-medium text-3xl'>{budgets.length}</h2>
                            </div>
                            <GiTwoCoins className='bg-purple-100 text-primary p-3 h-13 w-13 rounded-full' />
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