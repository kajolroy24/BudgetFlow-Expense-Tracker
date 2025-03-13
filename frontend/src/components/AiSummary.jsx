import React, { useContext, useState, useEffect } from 'react'
import { HiOutlineSparkles } from "react-icons/hi2";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const AiSummary = () => {

    const { budgets, expenses, backendUrl, token } = useContext(AppContext)
    const [aiResponse, setAiResponse] = useState('loading financial advice...')
    const [isSummaryFetched, setIsSummaryFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            if (isSummaryFetched || !budgets.length || !expenses.length) return; // If summary is already fetched, do nothing

            // Create a prompt based on the fetched data
            const prompt =
                `Generate a friendly and concise financial advice message for a user based on their budget and expenses data. The message should include a personalized and thematic greeting, such as "Hello, Financial Planner!" or "Hey there, Budgeting Champion!" to create a welcoming atmosphere and engage the user effectively in the conversation about financial planning, provide actionable advice, and use emojis to enhance engagement.
            The response should be 5-10 lines long. Here are the user's details (in INR):

            Budget: ${JSON.stringify(budgets)}
            Expenses: ${JSON.stringify(expenses)}`

            try {
                // Call the backend API
                const { data } = await axios.post(backendUrl + '/api/user/generate-advice', { prompt }, { headers: { token } })

                if (data.success) {
                    setAiResponse(data.response);
                    setIsSummaryFetched(true); // Mark summary as fetched
                } else {
                    setAiResponse(data.error || "No advice available.");
                }
            } catch (error) {
                console.error("Error fetching advice:", error);
                setAiResponse("Error fetching advice.");
            }
        };

        fetchData();
    }, [budgets, expenses, isSummaryFetched, backendUrl, token]);


    return (
        <div className='p-7 border border-gray-200 mt-4 rounded-2xl flex items-center justify-between'>
            <div className='w-full'>
                <div className='flex mb-2 flex-row space-x-2 items-center'>
                <HiOutlineSparkles className='rounded-full text-white w-10 h-10 p-1.5 bg-gradient-to-r from-blue-400 via-violet-400 to-rose-300' />
                    <h2 className='font-medium text-lg'>AI Budgeting Assistant</h2>
                </div>
                {isSummaryFetched ? (
                    <h2>
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    </h2>
                ) : (
                    <div className='w-full'>
                        <div className="leading-relaxed mb-3 w-full h-3 rounded animate-pulse bg-gradient-to-r from-blue-200 via-violet-200 to-rose-200"></div>
                        <div className="leading-relaxed mb-3 w-full h-3 rounded animate-pulse bg-gradient-to-r from-blue-200 via-violet-200 to-rose-200"></div>
                        <div className="leading-relaxed mb-3 w-full h-3 rounded animate-pulse bg-gradient-to-r from-blue-200 via-violet-200 to-rose-200"></div>
                        <div className="leading-relaxed mb-3 w-full h-3 rounded animate-pulse bg-gradient-to-r from-blue-200 via-violet-200 to-rose-200"></div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AiSummary