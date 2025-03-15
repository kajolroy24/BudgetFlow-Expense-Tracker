import React, { useContext } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AppContext } from '../context/AppContext';

const DashBarChart = ({ calculateTotal }) => {

  const {budgets, expenses} = useContext(AppContext)

  const data = budgets.map(budget => {
    const expense = expenses.filter(exp => exp.budgetId === budget._id);
    return {
      name: budget.name,
      budget: budget.amount,
      expense: calculateTotal(expense)
    };
  });

  return (
    <div className=' bg-white border border-gray-200 rounded-2xl p-5'>
      <h2 className='font-bold text-lg mb-4'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" stackId="a" fill='#4845d2' />
          <Bar dataKey="budget" stackId="a" fill='#c3c2ff' />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default DashBarChart