import React, { useContext } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { AppContext } from '../context/AppContext';

const DashBarChart = () => {

  const { budgets, expenses, calculateTotal } = useContext(AppContext)

  const data = budgets.map(budget => {
    const expense = expenses.filter(exp => exp.budgetId === budget._id);
    return {
      name: budget.name,
      budget: budget.amount,
      expense: calculateTotal(expense)
    };
  });

  return (
    <div className=' bg-white w-full border border-gray-200 rounded-2xl p-5'>
      <h2 className='font-semibold text-xl mb-4 text-gray-700'>Spending Analysis</h2>
      <ResponsiveContainer width={'100%'} height={320}>
        <BarChart data={data} barSize={30} >
          <CartesianGrid strokeDasharray="5 5" stroke="#E0E0E0" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: '#faf5ff' }} cursor={{fill: '#f3f4f6'}} />
          <Legend
            content={({ payload }) => (
              <div className="flex flex-wrap justify-center space-x-4 mt-3 bg-gray-100 p-2 rounded-2xl">
                {payload.map((entry, index) => (
                  <div key={`item-${index}`} className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-gray-700">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />

          <Bar dataKey="expense" fill='#4845d2' name="Expense" radius={[20, 20, 0, 0]} />
          <Bar dataKey="budget" fill='#43d9e2' name="Budget" radius={[20, 20, 0, 0]} />

          
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default DashBarChart