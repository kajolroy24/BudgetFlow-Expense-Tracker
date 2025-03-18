import React, { useContext } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseListTable = ({ expenseList }) => {

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

            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <div className='shadow hover:shadow-md rounded-2xl mt-3 max-sm:text-sm ltr:text-left rtl:text-left overflow-hidden'>
                <div className='grid grid-cols-4 sm:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] rounded-t-2xl text-gray-700 border-b border-slate-300 bg-slate-50 px-8 py-3.5'>
                    <h2 className='max-sm:hidden'>#</h2>
                    <h2 className='font-semibold max-sm:hidden'>Budget</h2>
                    <h2 className='font-semibold'>Expense</h2>
                    <h2 className='font-semibold'>Amount</h2>
                    <h2 className='font-semibold'>Date</h2>
                    <h2 className='font-semibold'>Action</h2>
                </div>
                {expenseList.map((expenses, index) => {
                    const budget = budgets.find(budget => budget._id === expenses.budgetId);
                    return (
                        <div key={expenses._id} className='grid grid-cols-4 sm:grid-cols-[0.7fr_2fr_2fr_2fr_2fr_1fr] max-sm:grid-cols-4 bg-white border-b border-gray-100 text-gray-600 px-8 py-2.5 items-center hover:bg-slate-50'>
                            <h2 className='max-sm:hidden'>{index + 1}</h2>
                            <div className='flex font-semibold items-center gap-2 max-sm:hidden'>
                                <h2 className='text-xl p-2 bg-slate-100 rounded-full'>{budget ? budget.emoji : "No Emoji"}</h2>
                                {budget.name}
                            </div>
                            <h2>{expenses.name}</h2>
                            <h2>Rs. {expenses.amount}</h2>
                            <h2>{expenses.date}</h2>
                            <h2 onClick={() => deleteExpenses(expenses._id)} className='' >
                                <button className='flex items-center justify-center gap-1 sm:bg-red-100 text-red-600 md:w-20 py-2 rounded-md text-xs font-medium'><FaRegTrashCan />
                                Delete
                                </button>
                            </h2>
                        </div>
                    )
                })
                }
            </div>



        </div>
    )
}

export default ExpenseListTable