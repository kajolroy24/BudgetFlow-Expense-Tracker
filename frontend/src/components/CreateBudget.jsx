import React, { useState } from 'react';
import BudgetForm from './BudgetForm'

const CreateBudget = ({refreshData}) => {

    const [isOpen, setIsOpen] = useState(false);

    function toggleForm () {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleForm} className='bg-slate-100 dark:bg-[#372d54] p-12 rounded-2xl items-center flex flex-col border-2 border-gray-200 dark:border-[#B5B0C7] border-dashed cursor-pointer hover:shadow-md'>
                <h2 className='text-3xl dark:text-[#B5B0C7]'>+</h2>
                <h2 className='dark:text-[#B5B0C7]'>Create New Budget</h2>

            </div>
                <BudgetForm isOpen={isOpen} closeForm={toggleForm} refreshData={refreshData} />
        </div>
    )
}

export default CreateBudget