import React, { useContext } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseListTable = ({ expenseList }) => {

    const { getUserExpenses, backendUrl, token } = useContext(AppContext)

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
            <div className='shadow-md rounded-lg mt-3 ltr:text-left rtl:text-right'>
                <div className='grid grid-cols-4 text-gray-700 bg-gray-100 px-6 py-3'>
                    <h2 className='font-semibold'>Name</h2>
                    <h2 className='font-semibold'>Amount</h2>
                    <h2 className='font-semibold'>Date</h2>
                    <h2 className='font-semibold'>Action</h2>
                </div>
                {expenseList.map((expenses, index) => (
                    <div className='grid grid-cols-4 border-b border-gray-100 text-gray-600 px-6 py-3'>
                        <h2>{expenses.name}</h2>
                        <h2>{expenses.amount}</h2>
                        <h2>{expenses.date}</h2>
                        <h2 className='text-red-600 cursor-pointer ml-3.5'>
                            <FaRegTrashCan onClick={() => deleteExpenses(expenses._id)} />
                        </h2>
                    </div>
                ))}

            </div>



        </div>
    )
}

export default ExpenseListTable