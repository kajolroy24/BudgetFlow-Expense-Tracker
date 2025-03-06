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
            {/* {
                expenseList.length === 0 ?
                    <p>No expenses for this budget.</p>
                    : (
                        <> */}
                            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                                <h2 className='font-semibold'>Name</h2>
                                <h2 className='font-semibold'>Amount</h2>
                                <h2 className='font-semibold'>Date</h2>
                                <h2 className='font-semibold'>Action</h2>
                            </div>
                            {expenseList.map((expenses, index) => (
                                <div className='grid grid-cols-4 bg-slate-200 p-2'>
                                    <h2>{expenses.name}</h2>
                                    <h2>{expenses.amount}</h2>
                                    <h2>{expenses.date}</h2>
                                    <h2 className='text-red-600 cursor-pointer'>
                                        <FaRegTrashCan onClick={() => deleteExpenses(expenses._id)} />
                                    </h2>
                                </div>
                            ))}
                        {/* </>
                    )
            } */}

        </div>
    )
}

export default ExpenseListTable