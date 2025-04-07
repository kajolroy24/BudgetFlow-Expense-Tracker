import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for user's dark mode preference
    return localStorage.getItem('darkMode') === 'true';
  });

  const [token, setToken] = useState('')
  const [userData, setUserData] = useState(false)
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

    // Save dark mode preference to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('darkMode', darkMode);
      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }, [darkMode]);

  const calculateTotal = (arr) => arr.reduce((total, item) => total + item.amount, 0);

  const capitalize = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const loadUserProfileData = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }
  }

  const getUserBudgets = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/all-budgets', { headers: { token } })
      if (data.success) {
        setBudgets(data.budgets.reverse())
        console.log(data.budgets)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }

  const getUserExpenses = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/all-expenses', { headers: { token } })
      if (data.success) {
        setExpenses(data.expenses.reverse())
        console.log(data.expenses)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }

  const value = {
    navigate, backendUrl,
    setToken, token,
    userData, setUserData,
    loadUserProfileData,
    budgets, setBudgets,
    getUserBudgets,
    expenses, setExpenses,
    getUserExpenses,
    capitalize, calculateTotal,
    darkMode, setDarkMode
  }

  useEffect(() => {
    if (token) {
      loadUserProfileData(),
      getUserBudgets(), 
      getUserExpenses()
    } else {
      setUserData(false)
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;
