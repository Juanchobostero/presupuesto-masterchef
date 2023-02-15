import asyncHandler from 'express-async-handler';
import Transaction from '../models/transactionModel.js';
import TransactionType from '../models/transactionTypeModel.js';

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
    const transactions = await Transaction.aggregate([
       { 
        '$lookup': {
        'from': TransactionType.collection.name,
        'localField': 'transactionType',
        'foreignField': '_id',
        'as': 'type'
        }
       },
      {
        $set: {
            type: { $arrayElemAt: ["$type.description", 0] }
        }
      },
      {
        $set: {
           dateFormat: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } }
        }
      },
      {
        "$group": {
          _id: "$transactionType",
          "total": {
            $sum: {
              "$toDouble": "$amount"
            }
          }
        }
      }
     ]).sort({ createdAt: -1 });

    res.json(transactions);
});

// @desc Get transaction total amount group by transactionType
// @route GET /api/transactions/totals
// @access Private
const getTotals = asyncHandler( async (req, res) => {
    const totals = await Transaction.aggregate([
      {
        "$group": {
          _id: "$transactionType",
          "total": {
            $sum: {
              "$toDouble": "$amount"
            }
          }
        }
      }
     ]);

    res.json(totals);
});


// @desc Get transaction by ID
// @route GET /api/transactions/:id
// @access Private
const getTransactionById = asyncHandler( async (req, res, id) => {
    const transaction = await Transaction.findById(id).aggregate([
        { 
         '$lookup': {
         'from': TransactionType.collection.name,
         'localField': 'transactionType',
         'foreignField': '_id',
         'as': 'type'
         }
        },
       {
         $set: {
             type: { $arrayElemAt: ["$type.description", 0] }
         }
       },
       {
         $set: {
            dateFormat: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } }
         }
       }
      ]);

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
    getTransactionById,
    getTotals
};