import React, { useContext } from 'react'
import CreateBudget from '../components/CreateBudget'
import { AppContext } from '../context/AppContext'
import BudgetItem from '../components/BudgetItem'

const BudgetList = () => {

  const { budgets, getUserBudgets, expenses } = useContext(AppContext)

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
          refreshData={() => getUserBudgets()}
        />
        {
          budgets.length > 0
            ? budgets.map((budget, index) => {
              // Filter expenses for the current budget
              const budgetExpenses = expenses.filter(expense => expense.budgetId === budget._id);
              return <BudgetItem budget={budget} expense={budgetExpenses} />
            })
            : [1, 2, 3, 4, 5].map((item, index) => (
              <div key={index} className='w-full bg-slate-200 rounded-lg h-[144px] animate-pulse'></div>
            ))

        }


      </div>
    </div>
  )
}

export default BudgetList