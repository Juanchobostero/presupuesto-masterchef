import express from "express";
const router = express.Router();
import { 
    registerTransaction,
    getTransactions,
    getTransactionById,
    getTotals
} from "../controllers/transactionController.js";

router.route('/')
    .get(getTransactions)
    .post(registerTransaction);
router.route('/totals')
    .get(getTotals);
router.route('/:id')
    .get(getTransactionById)

export default router;