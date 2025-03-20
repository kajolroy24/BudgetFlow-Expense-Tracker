import React, { useContext } from 'react'
import { AppContext } from '../src/context/AppContext'
import Cards from '../src/components/Cards'
import DashBarChart from '../src/components/DashBarChart'
import BudgetItem from '../src/components/BudgetItem'
import ExpenseListTable from '../src/components/ExpenseListTable'
import AiSummary from '../src/components/AiSummary'
import DoughnutChart from '../src/components/DoughnutChart'
import ExpenseTrendChart from '../src/components/ExpenseTrendChart'

const Dashboard = () => {

  const { userData, capitalize, budgets, expenses, calculateTotal } = useContext(AppContext)

  // Calculate total expenses
  const totalBudget = calculateTotal(budgets);
  const totalExpenses = calculateTotal(expenses);

  return (
    // <div>
    //   <div className='p-8'>
    //     <h2 className='font-bold text-3xl'>👋 Hi, {capitalize(userData.name)}</h2>
    //     <p className='text-gray-500'>Here's what's happening with your money. Let's manage your expenses.</p>
    //     <AiSummary />
    //     <div className='flex flex-col md:flex-row gap-6'>
    //       <Cards budgets={budgets} expenses={expenses} totalExpenses={totalExpenses} totalBudget={totalBudget} />
    //       <ExpenseTrendChart />
    //       <div className='lg:w-[22rem] mt-7'>
    //           <DoughnutChart />
    //       </div>
    //     </div>
    //     <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
    //       <div className='md:col-span-2 flex flex-col gap-5'>
    //         <div className='flex-grow'>
    //         <ExpenseTrendChart />
    //         </div>
    //         <DashBarChart />

    //         <ExpenseListTable expenseList={expenses} budgets={budgets} />
    //       </div>
    //       <div className='grid gap-5'>
    //         <h2 className='font-bold text-lg'>Latest Budgets</h2>
    //         {budgets.map((budget, index) => {
    //           const budgetExpenses = expenses.filter(expense => expense.budgetId === budget._id);
    //           return <BudgetItem
    //             key={index}
    //             budget={budget}
    //             expense={budgetExpenses}
    //           />
    //         })
    //         }
    //       </div>
    //     </div>
    //   </div>

    // </div>

    <div>
      <div className='p-8'>
        <h2 className='font-bold text-3xl'>👋 Hi, {capitalize(userData.name)}</h2>
        <p className='text-gray-500'>Here's what's happening with your money. Let's manage your expenses.</p>
        <AiSummary />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Cards budgets={budgets} expenses={expenses} totalExpenses={totalExpenses} totalBudget={totalBudget} />
          <div className='md:col-span-3 w-full'>
            <ExpenseTrendChart />

          </div>
          <div className='lg:w-[22rem] mt-7'>
            <DoughnutChart />
          </div>

        </div>

      </div>
    </div>

  )
}

export default Dashboard