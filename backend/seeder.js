import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import transactionTypes from "./data/transactionTypes.js";
import connectDB from "./config/db.js";
import TransactionType from "./models/transactionTypeModel.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await TransactionType.deleteMany();

        await TransactionType.insertMany(transactionTypes);

        console.log('Data imported !'.green.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await TransactionType.deleteMany();

        console.log('Data destroyed !'.red.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}