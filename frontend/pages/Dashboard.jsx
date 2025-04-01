import React, { useContext } from 'react'
import { AppContext } from '../src/context/AppContext'
import Cards from '../src/components/Cards'
import DashBarChart from '../src/components/DashBarChart'
import BudgetItem from '../src/components/BudgetItem'
import ExpenseListTable from '../src/components/ExpenseListTable'
import AiSummary from '../src/components/AiSummary'
import DoughnutChart from '../src/components/DoughnutChart'
import ExpenseTrendChart from '../src/components/ExpenseTrendChart'
import { assets } from '../src/assets/assets'

const Dashboard = () => {

  const { userData, capitalize, budgets, expenses, calculateTotal, navigate } = useContext(AppContext)

  // Calculate total expenses
  const totalBudget = calculateTotal(budgets);
  const totalExpenses = calculateTotal(expenses);

  // Get the latest 4 expenses
  const latestExpenses = expenses.slice(0, 4);
  const latestBudgets = budgets.slice(0, 4);

  return (
    <div className='p-8'>
      {(budgets.length === 0 || expenses.length === 0) ? (
        <div className="flex items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className='flex flex-col items-center'>
          <img className='w-24 h-24 sm:w-36 sm:h-36 md:w-60 md:h-60 lg:w-90 lg:h-90 object-cover' src={assets.vector} alt="" />
          <p className="text-gray-700 text-xl font-medium mb-4">Oops! Looks like you haven't added any budgets or expenses yet.<br/>Start by creating your first budget and tracking your expenses.</p>
          <button 
            onClick={() => navigate('/dashboard/budgets')} 
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-violet-500 transition duration-200"
          >
            Create Budget
          </button>
        </div>
      </div>
      ) : (
      <>
        <h2 className='font-bold text-3xl'>👋 Hi, {capitalize(userData.name)}</h2>
        <p className='text-gray-500 mt-2'>Here's what's happening with your money. Let's manage your expenses.</p>

        <AiSummary />

        <Cards budgets={budgets} expenses={expenses} totalExpenses={totalExpenses} totalBudget={totalBudget} />

        <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2 flex flex-col gap-5'>
            <div className='flex-grow'>
              <DashBarChart />
            </div>

            <ExpenseTrendChart />

            <ExpenseListTable expenseList={latestExpenses} budgets={budgets} variant="dashboard" />
          </div>

          <div className='flex flex-col gap-5'>
            <DoughnutChart />

            <h2 className='font-semibold text-gray-700 text-xl'>Latest Budgets</h2>
            {latestBudgets.map((budget, index) => {
              const budgetExpenses = expenses.filter(expense => expense.budgetId === budget._id);
              return <BudgetItem
                key={index}
                budget={budget}
                expense={budgetExpenses}
              />
            })
            }
          </div>
        </div>
      </>
  )}
    </div>

  )
}

export default Dashboard