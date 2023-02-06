import asyncHandler from 'express-async-handler';
import TransactionType from '../models/transactionTypeModel.js';

// @desc Get all trnsaction types
// @route GET /api/transactions-types
// @access Private
const getTransactionTypes = asyncHandler( async (req, res) => {
    const transactionTypes = await TransactionType.find({});

    res.json(transactionTypes);
});


// @desc Get transaction type by ID
// @route GET /api/transactions-types/:id
// @access Private
const getTransactionTypeById = asyncHandler( async (req, res) => {
    const transactionType = await TransactionType.findById(req.params.id);

    if(transactionType) {
        res.json(transactionType);
    } else {
        res.json(404);
        throw new Error('transaction type not found !');
    }
});

export { 
    getTransactionTypes,
    getTransactionTypeById
};