import React, { useContext, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import dayjs from "dayjs";
import { AppContext } from "../context/AppContext";

const ExpenseTrendChart = () => {
    const { expenses, budgets } = useContext(AppContext);
    const [view, setView] = useState("weekly"); // Toggle state for weekly/monthly

    const colors = ["#f34aed", "#43d9e2", "#7748ee", "#FFD93D", "#2CD3C4", "#FFA26B", "#FF5C8A", "#B39DDB"];
    const getColor = (index) => colors[index % colors.length];

    // Get start date based on view
    const startDate = view === "weekly"
        ? dayjs().subtract(7, "day").startOf("day") // Last 7 days
        : dayjs().subtract(1, "month").startOf("month"); // Last 1 month

    // Filter expenses based on date range
    const filteredExpenses = expenses.filter(expense => dayjs(expense.date).isAfter(startDate));

    // Generate list of unique dates
    const allDates = [...new Set(filteredExpenses.map(expense => dayjs(expense.date).format("YYYY-MM-DD")))].sort();

    // Organize expenses by category and date
    const categoryData = budgets.map((budget, index) => ({
        name: budget.name,
        color: getColor(index),
        values: allDates.map(date => {
            const dailyExpenses = filteredExpenses
                .filter(expense => expense.budgetId === budget._id && dayjs(expense.date).format("YYYY-MM-DD") === date)
                .reduce((sum, expense) => sum + expense.amount, 0);
            return { date: dayjs(date).format(view === "weekly" ? "ddd" : "MMM D"), [budget.name]: dailyExpenses };
        }),
    }));

    // Merge data into a single array format for Recharts
    const chartData = allDates.map((date, index) => {
        let entry = { date: dayjs(date).format(view === "weekly" ? "ddd" : "MMM D") };
        categoryData.forEach(category => {
            entry[category.name] = category.values[index][category.name] || 0;
        });
        return entry;
    });

    return (
        <div className="p-5 bg-white shadow hover:shadow-md rounded-2xl w-full">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl text-gray-700 font-semibold">Expense Trends</h3>
                <div className="flex gap-2">
                    <button className={`px-2 py-1 rounded-md text-sm ${view === "weekly" ? "bg-primary text-white" : "bg-purple-100 outline outline-primary text-primary"}`} onClick={() => setView("weekly")}>Weekly</button>
                    <button className={`px-2 py-1 rounded-md text-sm ${view === "monthly" ? "bg-primary text-white" : "bg-purple-100 outline outline-primary text-primary"}`} onClick={() => setView("monthly")}>Monthly</button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={310}>
                <AreaChart data={chartData}>
                <defs>
            {categoryData.map((category, index) => (
              <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={category.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={category.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="4 4" stroke="#E0E0E0" />
                    {categoryData.map((category, index) => (
                        <Area
                            key={category.name}
                            type="monotone"
                            dataKey={category.name}
                            stroke={category.color}
                            strokeWidth={2}
                            fill={`url(#color${index})`}
                            fillOpacity={0.8}
                        />
                    ))}
                    <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: '#faf5ff' }} />
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
                </AreaChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ExpenseTrendChart;


