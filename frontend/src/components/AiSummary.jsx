import React, { useContext, useState, useEffect } from 'react'
import { HiOutlineSparkles } from "react-icons/hi2";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const AiSummary = () => {

    const { getUserBudgets, getUserExpenses, backendUrl, token } = useContext(AppContext)
    const [aiResponse, setAiResponse] = useState('loading financial advice...')

    useEffect(() => {
        const fetchData = async () => {
            const budgets = await getUserBudgets();
            const expenses = await getUserExpenses();

            // Create a prompt based on the fetched data
            const prompt = `Please provide a summary or advice based on the following budget data: ${JSON.stringify(budgets)} and expense data: ${JSON.stringify(expenses)}.`;

            try {
                // Call the backend API
                const { data } = await axios.post(backendUrl + '/api/generate-advice', { prompt }, { headers: { token } })

                if (data.success) {
                    setAiResponse(data.response);
                } else {
                    setAiResponse(data.error || "No advice available.");
                }
            } catch (error) {
                console.error("Error fetching advice:", error);
                setAiResponse("Error fetching advice.");
            }
        };

        fetchData();
    }, [getUserBudgets, getUserExpenses]);


    return (
        <div className='p-7 border mt-4 rounded-2xl flex items-center justify-between'>
            <div>
                <div className='flex mb-2 flex-row space-x-1 items-center'>
                    <h2>AI Budgeting Assistant</h2>
                    <HiOutlineSparkles className='rounded-full text-white w-10 h-10 p-1.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate animate-pulse' />
                </div>
                <h2>{aiResponse}</h2>
            </div>
        </div>
    )
}

export default AiSummary