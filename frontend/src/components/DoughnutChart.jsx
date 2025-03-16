import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppContext } from '../context/AppContext';

const DoughnutChart = () => {

    const { budgets, expenses, calculateTotal } = useContext(AppContext)

    const colors = ["#FF66C4", "#00C9FF", "#FFD700", "#FF914D", "#A084E8"];
    const getColor = (index) => colors[index % colors.length];

    const data = budgets.map((budget, index) => {
        // Filter expenses for the current budget
        const budgetExpenses = expenses.filter(expense => expense.budgetId === budget._id);

        // Calculate the total amount for the current budget
        const totalAmount = calculateTotal(budgetExpenses)

        return {
            name: budget.name,
            value: totalAmount,
            color: getColor(index),
        };
    }).filter(item => item.value > 0); // Filter out any budget with zero total expenses

    const totalExpenses = data.reduce((sum, item) => sum + (item.value || 0), 0)

    return (
        <div className="flex items-center justify-center w-full p-5 bg-white rounded-lg shadow">
            <div className="relative w-[250px] h-[250px] flex items-center justify-center">
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>


            {/* Total Expenses */}
            <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">₹{totalExpenses}</span>
                </div>
            </div>

             {/* Custom Legend */}
             <div className="ml-4">
                <h3 className="text-gray-700 font-semibold text-lg">Expense Breakdown</h3>
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 my-1">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
 

        </div>
    );
};

export default DoughnutChart