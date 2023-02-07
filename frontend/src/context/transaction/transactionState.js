import React, { useReducer } from "react";
import transactionReducer from "./transactionReducer.js";
import { transactionContext } from "./transactionContext.js";
import axios from 'axios';

import { 
    GET_TRANSACTIONS_REQUEST, 
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAIL 
} from "../../types";

const TransactionState = props => {

    const initialState = {
        loading: false,
        transactions: [],
        error: false,
        total: 0
    }

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    // Functions
    const getTransactions = async () => {
        dispatch({
            type: GET_TRANSACTIONS_REQUEST
        });
        const url = 'http://localhost:5000/api/transaction-types';
        const { data } = await axios.get(url);

        console.log(data);

        // Get transactions
        dispatch({
            type: GET_TRANSACTIONS_SUCCESS,
            payload: data
        });
        
    };

    return (
        <transactionContext.Provider
            value={{
                loading: state.loading,
                transactions: state.transactions,
                error: state.error,
                total: state.total,
                getTransactions,
            }}
        >
            {props.children}
        </transactionContext.Provider>
    );

}

export default TransactionState;



