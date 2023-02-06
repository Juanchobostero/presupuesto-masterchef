import express from "express";
const router = express.Router();
import {
    getTransactionTypeById,
    getTransactionTypes
} from "../controllers/transactionTypeController.js";

router.route('/').get(getTransactionTypes);
router.route('/:id')
    .get(getTransactionTypeById)

export default router;