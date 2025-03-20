import React, { useContext } from 'react'
import { AppContext } from "../src/context/AppContext"
import ExpenseListTable from "../src/components/ExpenseListTable"
import DoughnutChart from '../src/components/DoughnutChart'
import ExpenseTrendChart from '../src/components/ExpenseTrendChart'

const ExpenseDataPage = ({ budgetData }) => {

  const { expenses } = useContext(AppContext)

  return (
    <div>
      <div className="p-10">
        <h2 className='text-3xl font-bold'>My Expenses</h2>

        <div className='sm:grid sm:grid-cols-1 lg:flex items-center gap-5 mt-7'>
          <DoughnutChart />
          <ExpenseTrendChart />
        </div>
        <ExpenseListTable expenseList={expenses} budgetData={budgetData} />

      </div>
    </div>
  )
}

export default ExpenseDataPage