import React, {useContext} from 'react'
import { AppContext } from "../src/context/AppContext"
import ExpenseListTable from "../src/components/ExpenseListTable"
import DoughnutChart from '../src/components/DoughnutChart'

const ExpenseDataPage = ({ budgetData, calculateTotal }) => {

    const { expenses } = useContext(AppContext)

  return (
    <div>
                <div className="p-10">
              <h2 className='text-3xl font-bold'>My Expenses</h2>
              <DoughnutChart  />
              <ExpenseListTable expenseList={expenses} budgetData={budgetData} />
            </div>
    </div>
  )
}

export default ExpenseDataPage