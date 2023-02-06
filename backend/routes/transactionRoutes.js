import express from "express";
const router = express.Router();
import { 
    registerTransaction,
    getTransactions,
    getTransactionById
} from "../controllers/transactionController.js";

router.route('/')
    .get(getTransactions)
    .post(registerTransaction);
router.route('/:id')
    .get(getTransactionById)

export default router;