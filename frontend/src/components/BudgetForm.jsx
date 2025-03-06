import React, { useContext, useState, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import CloseIcon from '../assets/close_icon.svg?react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BudgetForm = ({ isOpen, closeForm, refreshData }) => {

    const { token, backendUrl } = useContext(AppContext)

    const [emoji, setEmoji] = useState('😀')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const onCreateBudget = async (event) => {
        event.preventDefault();

        try {
            const formData = {
                emoji,
                name,
                amount
            };

            const { data } = await axios.post(backendUrl + '/api/user/create-budget', formData, { headers: { token } })

            if (data.success) {
                refreshData()
                toast.success(data.message)
                setEmoji('😀')
                setName('')
                setAmount('')
                closeForm()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center transition-colors
            ${isOpen ? 'visible bg-gray-500/75' : 'invisible'
            }`}
        >
            <div className={`bg-white sm:rounded-lg shadow-2xl w-full max-w-lg transition-all
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
            >
                <div className="relative float-end p-4">
                    <button onClick={closeForm} type="button" className="text-gray-500 hover:text-black h-4 w-4 ml-auto inline-flex items-center">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={onCreateBudget} className='p-6 text-center sm:text-left' >
                    <h1 className='font-semibold text-lg'>Create New Budget</h1>

                    <div className='mt-5'>
                        <button className="text-lg outline outline-gray-200 rounded px-4 py-1.5" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emoji}</button>
                        <div className='absolute'>
                            <EmojiPicker open={openEmojiPicker}
                                onEmojiClick={(e) => {
                                    setEmoji(e.emoji)
                                    setOpenEmojiPicker(false)
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black text-sm font-medium my-1'>Budget Name</h2>
                        <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2' type='text' placeholder="e.g. Home Decor" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black text-sm font-medium my-1'>Budget Amount</h2>
                        <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2' placeholder="e.g. 5000$" type="number" onChange={(e) => setAmount(e.target.value)} value={amount} required />
                    </div>
                    <button type='submit' className='bg-primary text-white w-full mt-8 h-10 px-4 py-2 rounded-md text-sm'>Create Budget</button>

                </form >
            </div >
        </div>
    )
}

export default BudgetForm