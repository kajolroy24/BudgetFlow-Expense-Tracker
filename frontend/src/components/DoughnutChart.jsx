import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppContext } from '../context/AppContext';

const DoughnutChart = ({ calculateTotal }) => {

    const { budgets, expenses } = useContext(AppContext)

    // Function to generate random colors for each category
    let lastColor = null; // Store the last assigned color

    const getRandomColor = () => {
        const colors = ["#FF66C4", "#00C9FF", "#FFD700", "#FF914D", "#A084E8"];
        let newColor;

        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === lastColor); // Keep picking until different

        lastColor = newColor; // Update last assigned color
        return newColor;
    };


    const data = budgets.map((budget) => {
        // Filter expenses for the current budget
        const budgetExpenses = expenses.filter(expense => expense.budgetId === budget._id);

        // Calculate the total amount for the current budget
        const totalAmount = calculateTotal(budgetExpenses)

        return {
            name: budget.name,
            value: totalAmount,
            color: getRandomColor(),
        };
    }).filter(item => item.value > 0); // Filter out any budget with zero total expenses

    const totalExpenses = data.reduce((sum, item) => sum + (item.value || 0), 0)

    return (
        <div className="relative flex flex-col items-center">
            <PieChart width={250} height={250}>
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
                <Legend />
            </PieChart>


            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-700">
                ₹{totalExpenses}
            </div>

        </div>
    );
};

export default DoughnutChart