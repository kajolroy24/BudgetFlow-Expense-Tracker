import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema ({
    userId: { type: String, required: true },
    budgetId: { type: String, required: true },
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    userData: {type: Object, required: true},
    budgetData: {type: Object, required: true},
    date: { type: String, required: true },
    createdBy: {type: String, required: true}
})

const expenseModel = mongoose.models.expense || mongoose.model('expense', expenseSchema)

export default expenseModel