import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'

const AddExpense = ({ budgetId, refreshData }) => {

    const { token, backendUrl } = useContext(AppContext)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const onAddNewExpense = async (event) => {
        event.preventDefault();

        try {
            dayjs.extend(LocalizedFormat)
            const currentDate = dayjs().format('ll')

            const formData = {
                budgetId,
                name,
                amount,
                date: currentDate
            };

            const { data } = await axios.post(backendUrl + '/api/user/add-expense', formData, { headers: { token } })

            if (data.success) {
                refreshData()
                toast.success(data.message)
                setName('')
                setAmount('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onAddNewExpense}>
            <div className='border border-gray-200 p-5 rounded-lg'>
                <h2 className='font-bold text-lg'>Add Expense</h2>
                <div className='mt-2'>
                    <h2 className='text-black text-sm font-medium my-1'>Expense Name</h2>
                    <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2' type='text' placeholder="e.g. Bedroom Decor" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className='mt-2'>
                    <h2 className='text-black text-sm font-medium my-1'>Expense Amount</h2>
                    <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2' placeholder="e.g. 1000" type="number" onChange={(e) => setAmount(e.target.value)} value={amount} required />
                </div>
                <button type='submit' className='bg-primary text-white w-full mt-3 h-10 px-4 py-2 rounded-md text-sm'>Add New Expense</button>

            </div>
        </form>


    )
}

export default AddExpense