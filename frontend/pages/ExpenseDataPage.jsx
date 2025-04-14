import React, { useContext } from 'react'
import { AppContext } from "../src/context/AppContext"
import ExpenseListTable from "../src/components/ExpenseListTable"
import DoughnutChart from '../src/components/DoughnutChart'
import ExpenseTrendChart from '../src/components/ExpenseTrendChart'
import { assets } from '../src/assets/assets'

const ExpenseDataPage = ({ budgetData }) => {

  const { expenses, navigate, darkMode } = useContext(AppContext)

  return (
    <div>
      {(expenses.length === 0) ? (
        <div className="flex items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 135px)' }}>
          <div className='flex flex-col items-center'>
            <img className='md:w-80 md:h-80 w-60 h-60 object-cover' src={`${darkMode ? assets.vector_dark : assets.vector_light}`} alt="" />
            <p className="text-gray-700 dark:text-white text-lg md:text-xl font-medium mb-4">Oops! Looks like you haven't added any budgets or expenses yet.<br />Start by creating your first budget and tracking your expenses.</p>
            <button
              onClick={() => navigate('/dashboard/budgets')}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-violet-500 transition duration-200"
            >
              Add Expense
            </button>
          </div>
        </div>
      ) : (
        <div className="p-10">
          <h2 className='text-3xl font-bold dark:text-white'>My Expenses</h2>

          <div className='sm:grid sm:grid-cols-1 lg:flex items-center gap-5 mt-7'>
            <DoughnutChart variant="expensePage" />
            <ExpenseTrendChart />
          </div>
          <ExpenseListTable expenseList={expenses} budgetData={budgetData} />

        </div>
      )}
    </div>
  )
}

export default ExpenseDataPage