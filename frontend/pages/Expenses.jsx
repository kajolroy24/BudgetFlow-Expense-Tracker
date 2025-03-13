import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BudgetItem from '../src/components/BudgetItem'
import { AppContext } from '../src/context/AppContext'
import AddExpense from '../src/components/AddExpense'
import ExpenseListTable from '../src/components/ExpenseListTable'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import AlertBox from '../src/components/AlertBox'
import axios from 'axios'
import { toast } from 'react-toastify'
import BudgetForm from '../src/components/BudgetForm'

const Expenses = () => {

  const { budgetId } = useParams()

  const { budgets, expenses, getUserExpenses, getUserBudgets, navigate, backendUrl, token } = useContext(AppContext)
  const [budgetData, setBudgetData] = useState(null)
  const [expenseData, setExpenseData] = useState([])

  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  function showAlert() {
    setIsOpen(true);
  };

  function closeAlert() {
    setIsOpen(false);
  }

  const fetchBudgetData = async () => {
    const selectedBudget = budgets.find(budget => budget._id === budgetId)
    setBudgetData(selectedBudget)

    console.log("Budget Data being passed:", budgetData);
    
    // Filter expenses that belong to the selected budget
    const filteredExpenses = expenses.filter(expense => expense.budgetId === budgetId);
    setExpenseData(filteredExpenses);

    console.log(filteredExpenses)
    console.log("Expenses from context:", expenses);
    console.log("Budget ID from URL:", budgetId);
  }

  const deleteBudget = async () => {

    try {

      const { data } = await axios.delete(backendUrl + `/api/user/delete-budget/${budgetId}`, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserBudgets()
        navigate('/dashboard/budgets')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const handleEditClick = () => {
    setIsEdit(true);  // Show the edit form when clicked
  }

  const handleCancelEdit = () => {
    setIsEdit(false);  // Hide the edit form when canceled
  }

  useEffect(() => {
    if (budgets.length > 0) {
      fetchBudgetData()
    }
  }, [budgets, expenses, budgetId])


  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold flex items-center justify-between'>My Expenses
        <div className='flex gap-4'>
          <button onClick={handleEditClick} className='flex items-center gap-2 bg-indigo-100 text-primary w-20 h-10 px-4 py-2 rounded-md text-sm font-medium'><FaRegEdit size={20} />Edit</button>
          <button onClick={showAlert} className='flex items-center gap-2 bg-red-100 text-red-600 w-24 h-10 px-4 py-2 rounded-md text-sm font-medium'><FaRegTrashCan />Delete</button>
        </div>
      </h2>
      <BudgetForm
        isOpen={isEdit} 
        closeForm={handleCancelEdit} 
        refreshData={getUserBudgets} 
        isEdit={isEdit} 
        existingBudget={budgetData}
       />
      <AlertBox isOpen={isOpen} closeAlert={closeAlert} onConfirm={deleteBudget} />
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetData ? <BudgetItem budget={budgetData} expense={expenseData ?? []} />
          : <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
        }
        <AddExpense budgetId={budgetId} refreshData={getUserExpenses} />
      </div>
      <div className='mt-4'>
        <ExpenseListTable expenseList={expenseData} budgetData={budgetData} />
      </div>
    </div>

  )
}

export default Expenses


