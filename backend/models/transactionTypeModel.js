import mongoose from 'mongoose';

const transactionTypeSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const TransactionType = mongoose.model('TransactionType', transactionTypeSchema);

export default TransactionType;