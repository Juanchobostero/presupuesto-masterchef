import asyncHandler from 'express-async-handler';
import Transaction from '../models/transactionModel.js';

// @desc Register a new budget
// @route POST /api/transactions
// @access Public
const registerTransaction = asyncHandler( async (req, res) => {
    const { description, amount, transactionType } = req.body;

    const transactionExists = await Transaction.findOne({ description, amount });

    if(transactionExists) {
        res.status(400);
        throw new Error('Transaction already exists');
    }

    const transaction = await Transaction.create({
        transactionType,
        description,
        amount
    });

    if(transaction) {
        res.status(201).json({
            _id: transaction._id,
            description: transaction.description,
            amount: transaction.amount,
            transactionType: transaction.transactionType
        });  
    } else {
        res.status(400);
        throw new Error('Invalid transaction data');
    }
});

// @desc Get all budgets
// @route GET /api/transactions
// @access Private
const getTransactions = asyncHandler( async (req, res) => {
    const transactions = await Transaction.find({});

    res.json(transactions);
});


// @desc Get transaction by ID
// @route GET /api/transactions/:id
// @access Private
const getTransactionById = asyncHandler( async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if(transaction) {
        res.json(transaction);
    } else {
        res.json(404);
        throw new Error('Transaction not found !');
    }
});

export { 
    registerTransaction, 
    getTransactions,
    getTransactionById
};