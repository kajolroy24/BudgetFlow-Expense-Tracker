import React, { useContext, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import dayjs from "dayjs";
import { AppContext } from "../context/AppContext";

const ExpenseTrendChart = () => {
    const { expenses, budgets } = useContext(AppContext);
    const [view, setView] = useState("weekly"); // Toggle state for weekly/monthly

    // Get start date based on view
    const startDate = view === "weekly"
        ? dayjs().subtract(7, "day").startOf("day") // Last 7 days
        : dayjs().subtract(1, "month").startOf("month"); // Last 1 month

    // Filter expenses based on date range
    const filteredExpenses = expenses.filter(expense => dayjs(expense.date).isAfter(startDate));

    // Generate list of unique dates
    const allDates = [...new Set(filteredExpenses.map(expense => dayjs(expense.date).format("YYYY-MM-DD")))].sort();

    // Organize expenses by category and date
    const categoryData = budgets.map(budget => ({
        name: budget.name,
        color: budget.color || "#" + ((Math.random() * 0xffffff) << 0).toString(16), // Random color for each category
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
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">Expense Trends</h3>
                <div className="flex gap-2">
                    <button variant={view === "weekly" ? "default" : "outline"} onClick={() => setView("weekly")}>Weekly</button>
                    <button variant={view === "monthly" ? "default" : "outline"} onClick={() => setView("monthly")}>Monthly</button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    {categoryData.map((category) => (
                        <Area
                            key={category.name}
                            type="monotone"
                            dataKey={category.name}
                            stroke={category.color}
                            fill={category.color}
                            fillOpacity={0.3}
                        />
                    ))}
                    <Tooltip />
                    <Legend
                        content={({ payload }) => (
                            <div className="flex justify-center space-x-4 mt-2">
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


