import express from "express";
import { loginUser, registerUser, getProfile, createBudget, getUserBudgets, addExpense, getUserExpenses, deleteExpenses, deleteBudget, updateBudget, aiSummary, updateProfile } from "../controllers/userController.js ";
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/create-budget', authUser, createBudget)
userRouter.get('/all-budgets', authUser, getUserBudgets)
userRouter.post('/add-expense', authUser, addExpense)
userRouter.get('/all-expenses', authUser, getUserExpenses)
userRouter.delete('/delete-expense/:expenseId', authUser, deleteExpenses)
userRouter.delete('/delete-budget/:budgetId', authUser, deleteBudget)
userRouter.put('/update-budget/:budgetId', authUser, updateBudget)
userRouter.post('/generate-advice', authUser, aiSummary)

export default userRouter;
