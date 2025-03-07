import React, { useContext, useState, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import CloseIcon from '../assets/close_icon.svg?react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BudgetForm = ({ isOpen, closeForm, refreshData, isEdit, existingBudget }) => {

    const { token, backendUrl } = useContext(AppContext)

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    // const [emoji, setEmoji] = useState(isEdit ? existingBudget?.emoji : '😀')
    // const [name, setName] = useState(isEdit ? existingBudget?.name : '')
    // const [amount, setAmount] = useState(isEdit ? existingBudget?.amount : '')
    const [formData, setFormData] = useState({
        emoji: '😀',
        name: '',
        amount: ''
    });

    // When the form is open and is in edit mode, pre-fill the fields with existing budget data
    useEffect(() => {
        if (isEdit && existingBudget) {
            setFormData({
                emoji: existingBudget.emoji || '😀',
                name: existingBudget.name || '',
                amount: existingBudget.amount || '',
            });
        }
    }, [isEdit, existingBudget]);

    // Handle emoji selection
    const handleEmojiClick = (e) => {
        // console.log('Emoji object:', emojiObject);  // Log the emojiObject
        setFormData((prevData) => ({
            ...prevData,
            emoji: e.emoji,  // Set selected emoji
        }));
        setOpenEmojiPicker(false);  // Close the picker after selection
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (edit or create a budget)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // If isEdit is true, this means we're editing an existing budget
            if (isEdit) {
                // Perform the update API call (example)
                const { data } = await axios.put(backendUrl + `/api/user/update-budget/${existingBudget._id}`, formData, { headers: { token } });
                if (data.success) {
                    refreshData();  // Refresh the data (probably fetch expenses and budgets)        
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            } else {
                // If isEdit is false, we are creating a new budget
                const { data } = await axios.post(backendUrl + '/api/user/create-budget', formData, { headers: { token } });
                if (data.success) {
                    toast.success(data.message);
                    refreshData();  // Refresh the data (probably fetch expenses and budgets)
                } else {
                    toast.error(data.message);
                }
            }

            // Close the form after submission    
            closeForm();
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error(error.message);
        }
    };

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
                <form onSubmit={handleSubmit} className='p-6 text-center sm:text-left' >
                    <h1 className='font-semibold text-lg'>{isEdit ? 'Edit Budget' : 'Create New Budget'}</h1>

                    <div className='mt-5'>
                        <button className="text-lg outline outline-gray-200 rounded px-4 py-1.5" 
                        type='button'
                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                            {formData.emoji}
                        </button>
                        {openEmojiPicker && (
                            <div className="absolute z-10">
                                <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                    disableSearchBar={true}  // Optional: Disables search bar
                                />
                            </div>
                        )}
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black text-sm font-medium my-1'>Budget Name</h2>
                        <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2'
                            type='text'
                            placeholder="e.g. Home Decor"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-2'>
                        <h2 className='text-black text-sm font-medium my-1'>Budget Amount</h2>
                        <input className='border border-gray-200 rounded-sm w-full h-10 px-3 py-2 mt-1 text-sm focus:outline-none focus:border-primary focus:border-2'
                            type="number"
                            placeholder="e.g. 5000$"
                            name='amount'
                            onChange={handleChange}
                            value={formData.amount}
                            required
                        />
                    </div>
                    <button type='submit' className='bg-primary text-white w-full mt-8 h-10 px-4 py-2 rounded-md text-sm'>{isEdit ? 'Update Budget' : 'Create Budget'}</button>

                </form >
            </div >
        </div>
    )
}

export default BudgetForm