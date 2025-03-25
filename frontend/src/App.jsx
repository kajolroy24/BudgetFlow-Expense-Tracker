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
import { useEffect, useState } from "react";
import ExpenseDataPage from "../pages/ExpenseDataPage"
import Profile from "../pages/Profile"

function App() {

  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

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
            <ExpenseDataPage />
          </DashLayout>
        } />
        <Route path="/dashboard/upgrade" element={
          <DashLayout>
            <Upgrade />
          </DashLayout>
        }
        />
        <Route path="/dashboard/profile" element={
          <DashLayout>
            <Profile />
          </DashLayout>
        }
        />

      </Routes>

    </>
  )
}

export default App
