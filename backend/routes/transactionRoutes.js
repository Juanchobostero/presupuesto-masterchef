import express from "express";
const router = express.Router();
import { 
    registerTransaction,
    getTransactions,
    getTransactionById
} from "../controllers/transactionController.js";

router.route('/').post(registerTransaction).get(getTransactions);
router.route('/:id')
    .get(getTransactionById)

export default router;