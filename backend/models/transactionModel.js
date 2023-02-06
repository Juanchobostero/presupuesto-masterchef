import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    transactionType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TransactionType'
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        default: 0.0
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;