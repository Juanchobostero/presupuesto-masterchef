import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    transactionType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TransactionType'
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0.0
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;