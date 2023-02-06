import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';
import morgan from 'morgan';
import transactionRoutes from './routes/transactionRoutes.js';
import transactionTypeRoutes from './routes/transactionTypeRoutes.js';

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running ...');
});

app.use('/api/transactions', transactionRoutes);
app.use('/api/transaction-types', transactionTypeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);