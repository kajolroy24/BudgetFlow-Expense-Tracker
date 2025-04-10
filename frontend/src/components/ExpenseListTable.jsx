import React, { useContext } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseListTable = ({ expenseList, variant }) => {

    const { getUserExpenses, backendUrl, token, budgets } = useContext(AppContext)

    const deleteExpenses = async (expenseId) => {

        try {

            const { data } = await axios.delete(backendUrl + `/api/user/delete-expense/${expenseId}`, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserExpenses()

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return (
        <div className='mt-3'>

            <h2 className='font-bold text-lg dark:text-white'>Latest Expenses</h2>
            <div className='shadow hover:shadow-md rounded-2xl mt-3 ltr:text-left rtl:text-left overflow-hidden'>
                <div className={`grid ${variant === 'dashboard' ? 'md:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] max-xl:hidden' : 'lg:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] max-lg:hidden'} rounded-t-2xl text-gray-700 dark:text-white border-b border-slate-300 dark:border-gray-700 bg-slate-50 dark:bg-[#1a1134] px-8 py-3.5`}>
                    <h2 className='max-sm:hidden'>#</h2>
                    <h2 className='font-semibold'>Budget</h2>
                    <h2 className='font-semibold'>Expense</h2>
                    <h2 className='font-semibold'>Amount</h2>
                    <h2 className='font-semibold'>Date</h2>
                    <h2 className='font-semibold'>Action</h2>
                </div>
                {expenseList.map((expenses, index) => {
                    if (!budgets || budgets.length === 0) {
                        return (
                            <div key={expenses._id} className="bg-gray-100 p-4 text-center text-gray-700">
                                <p>Loading budgets...</p>
                            </div>
                        );
                    }
                    const budget = budgets.find(budget => budget._id === expenses.budgetId);
                    return (
                        <div key={expenses._id} className={`grid ${variant === 'dashboard' ? 'xl:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] max-xl:px-8 max-xl:py-6' : 'lg:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] max-lg:px-8 max-lg:py-6'} bg-white dark:bg-[#211641] border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-[#B5B0C7] px-8 py-2.5 items-center hover:bg-slate-50 dark:hover:bg-[#1a1134]`}>
                            <h2 className={`${variant === 'dashboard' ? 'max-xl:hidden' : 'max-lg:hidden'}`}>{index + 1}</h2>
                            <div className='flex justify-between items-center'>
                                <div className={`flex capitalize font-medium items-center gap-2 ${variant === 'dashboard' ? 'max-xl:mb-1' : 'max-lg:mb-1'}`}>
                                    <h2 className='text-xl p-2 bg-slate-100 dark:bg-[#140a2c] rounded-full'>{budget ? budget.emoji : "No Emoji"}</h2>
                                    {budget.name}
                                </div>
                                <button onClick={() => deleteExpenses(expenses._id)} className={`flex items-center justify-center gap-1 bg-red-100 text-red-600 py-1.5 px-2 rounded-md text-xs font-medium ${variant === 'dashboard' ? 'max-xl:flex xl:hidden' : 'max-lg:flex lg:hidden'}`}><FaRegTrashCan />
                                    Delete
                                </button>
                            </div>
                            <div className={`flex ${variant === 'dashboard' ? 'max-xl:mb-1' : 'max-lg:mb-1'}`}>
                                <p className={`mr-1 text-gray-700 font-semibold ${variant === 'dashboard' ? 'xl:hidden' : 'lg:hidden'}`}>Expense Name:</p>
                                <h2 className='capitalize'>{expenses.name}</h2>
                            </div>
                            <div className={`flex ${variant === 'dashboard' ? 'max-xl:mb-1' : 'max-lg:mb-1'}`}>
                                <p className={`mr-1 text-gray-700 font-semibold ${variant === 'dashboard' ? 'xl:hidden' : 'lg:hidden'}`}>Expense Amount:</p>
                                <h2>Rs. {expenses.amount}</h2>
                            </div>
                            <div className='flex'>
                                <p className={`mr-1 text-gray-700 font-semibold ${variant === 'dashboard' ? 'xl:hidden' : 'lg:hidden'}`}>Date:</p>
                                <h2>{expenses.date}</h2>
                            </div>

                            <button onClick={() => deleteExpenses(expenses._id)} className={`flex items-center justify-center gap-1 bg-red-100 dark:bg-[#3b2626] dark:text-red-500 text-red-600 md:w-20 py-2 rounded-md text-xs font-medium ${variant === 'dashboard' ? 'max-xl:hidden' : 'max-lg:hidden'}`}><FaRegTrashCan />
                                Delete
                            </button>

                        </div>
                    )
                })
                }
            </div>



        </div>
    )
}

export default ExpenseListTable