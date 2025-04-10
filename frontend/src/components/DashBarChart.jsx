import React, { useContext } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { AppContext } from '../context/AppContext';

const DashBarChart = () => {

  const { budgets, expenses, calculateTotal, darkMode } = useContext(AppContext)

  const data = budgets.map(budget => {
    const expense = expenses.filter(exp => exp.budgetId === budget._id);
    return {
      name: budget.name,
      budget: budget.amount,
      expense: calculateTotal(expense)
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-xl bg-[#faf5ff] dark:bg-[#140a2c] border border-purple-200 dark:border-0 py-2 px-3'>
          <h4 className='dark:text-white font-medium py-0.5'>{label}</h4> 
          <p className='text-[#7748ee] py-0.5'>
            Expense: {payload[0].value}
          </p>
          <p className='text-[#43d9e2] py-0.5'>
            Budget: {payload[1].value}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className=' bg-white w-full border border-gray-200 rounded-2xl p-5 dark:bg-[#211641] dark:border-none capitalize'>
      <h2 className='font-semibold text-xl mb-4 text-gray-700 dark:text-white'>Spending Analysis</h2>
      <ResponsiveContainer width={'100%'} height={320}>
        <BarChart data={data} barSize={30} >
          <CartesianGrid strokeDasharray="5 5" stroke={darkMode ? '#b5b0c74a' : '#E0E0E0'} vertical={false} />
          <XAxis dataKey="name" stroke={darkMode ? '#B5B0C7' : '#818181'} />
          <YAxis stroke={darkMode ? '#B5B0C7' : '#818181'} />
          {/* <Tooltip contentStyle={{ borderRadius: '10px', border: darkMode ? 'none' : '1px solid #ccc', backgroundColor: darkMode ? '#140a2c' : '#faf5ff' }} cursor={{fill: darkMode ? '#b5b0c74a' : '#f3f4f6'}} /> */}
          <Tooltip 
          content={<CustomTooltip darkMode={darkMode} />} // Use custom tooltip
          cursor={{ fill: darkMode ? '#b5b0c74a' : '#f3f4f6' }} 
        />
          <Legend
            content={({ payload }) => ( 
              <div className="flex flex-wrap justify-center space-x-4 mt-3 bg-gray-100 dark:bg-[#140a2c] p-2 rounded-2xl">
                {payload.map((entry, index) => (
                  <div key={`item-${index}`} className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-gray-700 dark:text-[#B5B0C7]">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />

          <Bar dataKey="expense" fill='#7748ee' name="Expense" radius={[20, 20, 0, 0]} />
          <Bar dataKey="budget" fill='#43d9e2' name="Budget" radius={[20, 20, 0, 0]} />

          
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default DashBarChart