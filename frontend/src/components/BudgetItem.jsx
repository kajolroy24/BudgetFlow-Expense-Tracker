import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const BudgetItem = ({ budget, expense }) => {

    const { navigate } = useContext(AppContext)

    // Calculate total spent 
    const totalSpent = expense.reduce((acc, curr) => acc + (curr.amount || 0), 0)

    const remaining = budget.amount - totalSpent;
    const spentPercentage = budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;

    return (
        <div onClick={() => { navigate(`/dashboard/expenses/${budget._id}`); scrollTo(0, 0) }} className='p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md cursor-pointer h-[160px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 px-3 bg-slate-100 rounded-full'>{budget.emoji}</h2>
                    <div>
                        <h2 className='font-bold capitalize'>{budget.name}</h2>
                        <h2 className='text-sm text-gray-500'>{expense.length || 0} items</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>${totalSpent} Spent</h2>
                    <h2 className='text-xs text-slate-400'>${remaining} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='bg-primary h-2 rounded-full'
                    style={{width: `${spentPercentage}%`}}></div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem