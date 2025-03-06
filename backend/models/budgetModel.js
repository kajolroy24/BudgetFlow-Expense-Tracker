import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema ({
    userId: { type: String, required: true },
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    emoji: {type: String},
    userData: {type: Object, required: true},
    expenseData: { type: [Object], default: [] },
    createdBy: {type: String, required: true}
}, { minimize: false })

const budgetModel = mongoose.models.budget || mongoose.model('budget', budgetSchema)

export default budgetModel