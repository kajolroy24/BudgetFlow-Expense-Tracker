import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Label, ResponsiveContainer } from "recharts";
import { AppContext } from '../context/AppContext';

const DoughnutChart = ({variant}) => {

    const { budgets, expenses, calculateTotal, darkMode } = useContext(AppContext)

    const colors = ["#f34aed", "#43d9e2", "#7748ee", "#FFD93D", "#BFEE48", "#3D63FF"];
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
        <div className='p-6 bg-white rounded-2xl max-sm:mb-5 shadow hover:shadow-md dark:bg-[#211641]'>
            <h3 className="text-gray-700 text-center font-semibold text-xl dark:text-white">Expense Breakdown</h3>
            <div className='flex justify-center'>

                <ResponsiveContainer width={'100%'} height={250}>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={100}
                            dataKey="value"
                            stroke="none"
                            paddingAngle={1}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}

                            {/* Total Expenses */}
                            <Label position="center" dy={-12} fill={darkMode ? '#B5B0C7' : '#818181'} className="text-lg font-medium mb-10" value="Total" />

                            <Label position="center" dy={12} fill={darkMode ? '#ffffff' : '#000000'} className="text-3xl font-semibold" value={`₹${totalExpenses}`} />

                        </Pie>


                        <Tooltip contentStyle={{ borderRadius: '10px', border: darkMode ? 'none' : '1px solid #e9d5ff',  backgroundColor: darkMode ? '#211641' : '#faf5ff' }}
                            formatter={(value, name, props) => {
                                const color = props.payload.color; // Get the color from the payload
                                return [
                                    <span style={{ color }} key="tooltip-text">
                                        {name}: ₹{value}
                                    </span>
                                ];
                            }}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className={`flex flex-wrap justify-center gap-3 bg-gray-100 p-2 rounded-2xl dark:bg-[#140a2c] ${variant === 'expensePage' ? 'lg:w-2xs' : 'w-full'}`}>
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-gray-600 dark:text-[#B5B0C7]">{item.name}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DoughnutChart