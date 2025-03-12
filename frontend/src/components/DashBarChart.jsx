import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBarChart = ({ budgets, expenses, calculateTotal }) => {

  const data = budgets.map(budget => {
    const expense = expenses.filter(exp => exp.budgetId === budget._id);
    return {
      name: budget.name,
      budget: budget.amount,
      expense: calculateTotal(expense)
    };
  });

  return (
    <div className='border border-gray-200 rounded-lg p-5'>
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