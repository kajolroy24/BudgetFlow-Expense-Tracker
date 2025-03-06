import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import budgetModel from "../models/budgetModel.js";
import expenseModel from "../models/expenseModel.js";
import mongoose from "mongoose";

//token creation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        // checking user email already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "user email already exists"
            });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email"
            })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a strong password"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // const userId = await userModel.userId

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = createToken(user._id);
        res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API  to login user login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User doesnot exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token, user })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const createBudget = async (req, res) => {
    try {

        const { userId, name, amount, emoji } = req.body

        const userData = await userModel.findById(userId).select(['-password', '-budgetData'])

        const expenseData = await expenseModel.findById(userId).select(['-password', '-budgetData'])

        const budgetData = {
            userId,
            name,
            amount,
            emoji,
            userData,
            expenseData,
            createdBy: userData.email
        }

        // Create the new budget document
        const newBudget = new budgetModel(budgetData)
        await newBudget.save()

        const userBudgetData = {
            budgetId: newBudget._id,
            name,
            amount,
            emoji,
            expenseData
        }

        // Update the budget for the user
        await userModel.findByIdAndUpdate(userId, {
            $push: { budgetData: userBudgetData }
        })

        res.json({ success: true, message: "New Budget Created!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all budget list
const getUserBudgets = async (req, res) => {

    try {

        const { userId } = req.body
        const budgets = await budgetModel.find({ userId })

        res.json({ success: true, budgets })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// const addExpense = async (req, res) => {
//     try {

//         const { userId, budgetId, name, amount } = req.body

//         const userData = await userModel.findById(userId).select(['-password', '-budgetData'])

//         const budgetData = await budgetModel.findById(budgetId).select(['name', 'amount', 'emoji'])

//         // Check if the user has sufficient budget before adding the expense
//         let totalExpenses = 0;

//         // Calculate the total expenses already recorded for the selected budget
//         const user = await userModel.findOne({ _id: userId, "budgetData.budgetId": budgetId });

//         if (user) {
//             // Aggregate the existing expenses for this budget
//             user.budgetData[0].expenseData.forEach(expense => {
//                 totalExpenses += expense.amount; // Sum the amounts of all existing expenses
//             });
//         }

//            // Calculate the remaining budget
//            const remainingBudget = budgetData.amount - totalExpenses;

//                 // Debugging output for remaining budget check
//                 console.log("Total Expenses:", totalExpenses);
//                 console.log("Remaining Budget:", remainingBudget);
//                 console.log("Amount to Add:", amount);

//         if (amount > remainingBudget) {
//             return res.json({ success: false, message: "Expense exceeds the available budget!" });
//         }

//         const expenseData = {
//             userId,
//             budgetId,
//             name,
//             amount,
//             userData,
//             budgetData,
//             createdBy: userData.email
//         }

//         // Create the new expense document
//         const newExpense = new expenseModel(expenseData)
//         await newExpense.save()

//         const userExpenseData = {
//             expenseId: newExpense._id,
//             name,
//             amount,
//         }

//         // Update the budget model with the new expense using aggregation pipeline
//         await budgetModel.findByIdAndUpdate(
//             budgetId,
//             [
//                 {
//                     $set: {
//                         expenseData: {
//                             $cond: {
//                                 if: { $eq: [{ $type: "$expenseData" }, "array"] },
//                                 then: { $concatArrays: ["$expenseData", [userExpenseData]] },
//                                 else: [userExpenseData]
//                             }
//                         }
//                     }
//                 }
//             ],
//             { new: true }
//         );

//         // Convert budgetId to ObjectId
//         const objectBudgetId = new mongoose.Types.ObjectId(`${budgetId}`);

//         const userCheck = await userModel.findOne(
//             { _id: userId, "budgetData.budgetId": objectBudgetId },
//             { "budgetData.$": 1 }
//         );

//         if (!userCheck) {
//             return res.json({ success: false, message: "Budget not found in user model" });
//         }

//         // Step 1: If expenseData is null, initialize it as an empty array
//         if (userCheck.budgetData[0].expenseData === null) {
//             await userModel.updateOne(
//                 { _id: userId, "budgetData.budgetId": objectBudgetId },
//                 { $set: { "budgetData.$.expenseData": [] } }
//             );
//         }

//         // Step 2: Push new expense into array without overwriting existing data
//         await userModel.updateOne(
//             { _id: userId, "budgetData.budgetId": objectBudgetId },
//             { $push: { "budgetData.$.expenseData": { name, amount } } }
//         );

//         res.json({ success: true, message: "New Expense Added!" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const addExpense = async (req, res) => {
    try {
        const { userId, budgetId, name, amount, date } = req.body;

        const userData = await userModel.findById(userId).select(['-password', '-budgetData']);
        const budgetData = await budgetModel.findById(budgetId).select(['name', 'amount', 'emoji', 'expenseData']);

        const objectBudgetId = new mongoose.Types.ObjectId(`${budgetId}`);

        if (!budgetData) {
            return res.json({ success: false, message: "Budget not found!" });
        }

        // Calculate total expenses for the given budget
        // let totalExpenses = 0;
        // if (Array.isArray(budgetData.expenseData)) {
        //     totalExpenses = budgetData.expenseData.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
        // }
        const totalExpenses = await expenseModel
            .find({ budgetId })  // Find all expenses with this budgetId
            .select("amount")     // Only select the 'amount' field
            .lean()               // Optimize by reducing Mongoose overhead
            .then(expenses => expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0));

        // Calculate remaining budget
        const remainingBudget = budgetData.amount - totalExpenses;

        if (amount <= 0) {
            return res.json({ success: false, message: "Expense amount must be greater than zero!" });
        }

        // Prevent expense from exceeding budget
        if (amount > remainingBudget) {
            return res.json({ success: false, message: "Expense exceeds the available budget! Cannot add expense." });
        }

        // Create the new expense document
        const newExpense = new expenseModel({
            userId,
            budgetId,
            name,
            amount,
            date,
            userData,
            budgetData,
            createdBy: userData.email
        });
        await newExpense.save();

        const expenseEntry = { expenseId: newExpense._id, name, amount };

        // **Step 1: Ensure `expenseData` is an array in the Budget Model**
        await budgetModel.updateOne(
            { _id: budgetId, expenseData: null },
            { $set: { expenseData: [] } }
        );

        // **Step 2: Push the new expense data into the Budget Model**
        await budgetModel.updateOne(
            { _id: budgetId },
            { $push: { expenseData: expenseEntry } }
        );

        // **Step 3: Ensure `expenseData` is an array in the User Model**
        await userModel.updateOne(
            { _id: userId, "budgetData.budgetId": objectBudgetId, "budgetData.expenseData": null },
            { $set: { "budgetData.$.expenseData": [] } }
        );

        // **Step 4: Push the new expense data into the User Model**
        await userModel.updateOne(
            { _id: userId, "budgetData.budgetId": objectBudgetId },
            { $push: { "budgetData.$.expenseData": expenseEntry } }
        );

        res.json({ success: true, message: "New Expense Added!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all expenses list
const getUserExpenses = async (req, res) => {

    try {

        const { userId } = req.body
        const expenses = await expenseModel.find({ userId })

        res.json({ success: true, expenses })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteExpenses = async (req, res) => {

    try {

        const { userId } = req.body
        const { expenseId } = req.params;

        const expenseData = await expenseModel.findById(expenseId)

        const budgetId = expenseData.budgetId;
        const objectBudgetId = new mongoose.Types.ObjectId(`${budgetId}`);

        // verify user
        if (expenseData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized Action' })
        }

        await expenseModel.findByIdAndDelete(expenseId);

        // Update the Budget Model
        await budgetModel.updateOne(
            { _id: budgetId },
            { $pull: { expenseData: { expenseId: expenseData._id } } }
        );

        // Update the User Model
        await userModel.updateOne(
            { _id: userId, "budgetData.budgetId": objectBudgetId },
            { $pull: { "budgetData.$.expenseData": { expenseId: expenseData._id } } }
        );

        res.json({ success: true, message: 'Expense Deleted Successfully' });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const deleteBudget = async (req, res) => {

    try {

        const { userId } = req.body
        const { budgetId } = req.params;
        console.log(budgetId)

        const budgetData = await budgetModel.findById(budgetId)

        // verify user
        if (budgetData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized Action' })
        }

        // Now delete the budget
        const deletedBudget = await budgetModel.findByIdAndDelete(budgetId);

        if (!deletedBudget) {
            return res.status(404).json({ success: false, message: 'Budget not found' });
        }

        // Delete all expenses associated with the budget
        await expenseModel.deleteMany({ budgetId });

        // Update the User Model
        await userModel.updateOne(
            { _id: userId, "budgetData.budgetId": budgetId },
            { $pull: { budgetData: { budgetId } } } // Remove the entire budget object
        );

        res.json({ success: true, message: 'Budget Deleted Successfully' });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { loginUser, registerUser, getProfile, createBudget, getUserBudgets, addExpense, getUserExpenses, deleteExpenses, deleteBudget }