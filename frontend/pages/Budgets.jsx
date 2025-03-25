import React from 'react'
import BudgetList from '../src/components/BudgetList'

const Budgets = () => {
  return (
    <div>
      <div className='p-10'>
        <h2 className='font-bold text-3xl'>My Budgets</h2>
        <BudgetList />
      </div>
    </div>
  )
}

export default Budgets