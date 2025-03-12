import Home from "../pages/Home"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "../pages/Login"
import { ToastContainer } from "react-toastify"
import Dashboard from "../pages/Dashboard"
import DashLayout from "./components/DashLayout"
import Budgets from '../pages/Budgets'
import Expenses from '../pages/Expenses'
import Upgrade from '../pages/Upgrade'
import Navbar from "./components/Navbar"
import { useContext, useEffect, useState } from "react";
import ExpenseListTable from "./components/ExpenseListTable"
import { AppContext } from "./context/AppContext"

function App() {

  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const {expenses} = useContext(AppContext)

  // Only show Navbar on specific routes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/login') {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route path='/dashboard' element={
          <DashLayout>
            <Dashboard />
          </DashLayout>
        }
        />
        <Route path="/dashboard/budgets" element={
          <DashLayout>
            <Budgets />
          </DashLayout>
        }
        />
        <Route path="/dashboard/expenses/:budgetId" element={
          <DashLayout>
            <Expenses />
          </DashLayout>
        }
        />
        <Route path="/dashboard/expenses" element={
          <DashLayout>
            <div className="p-10">
            <h2 className='text-3xl font-bold'>My Expenses</h2>
              <ExpenseListTable expenseList={expenses} />
            </div>
          </DashLayout>
        } />
        <Route path="/dashboard/upgrade" element={
          <DashLayout>
            <Upgrade />
          </DashLayout>
        }
        />
      </Routes>


    </>
  )
}

export default App
