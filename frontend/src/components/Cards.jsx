import React from 'react'
import { LuPiggyBank, LuHandCoins } from 'react-icons/lu'
import { GiTwoCoins } from "react-icons/gi";

const Cards = ({ budgets, totalBudget, totalExpenses }) => {

    return (

        <div>
            {
            budgets.length > 0
                ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='p-7 border border-gray-200 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>{totalBudget}</h2>
                        </div>
                        <LuPiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                    <div className='p-7 border border-gray-200 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Spent</h2>
                            <h2 className='font-bold text-2xl'>{totalExpenses}</h2>
                        </div>
                        <LuHandCoins className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
                    </div>
                    <div className='p-7 border border-gray-200 rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>No of Budgets</h2>
                            <h2 className='font-bold text-2xl'>{budgets.length}</h2>
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