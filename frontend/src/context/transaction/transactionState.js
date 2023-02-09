import React, { useReducer } from "react";
import transactionReducer from "./transactionReducer.js";
import { transactionContext } from "./transactionContext.js";

import { 
    GET_TRANSACTIONS_REQUEST, 
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAIL, 
    GET_TRANSACTION_TYPES_REQUEST,
    GET_TRANSACTION_TYPES_SUCCESS,
    GET_TRANSACTION_TYPES_FAIL
} from "../../types";
import axiosClient from "../../config/axios.js";

const TransactionState = props => {

    const transactionTypesFromStorage = localStorage.getItem('transactionTypes') 
    ? JSON.parse(localStorage.getItem('transactionTypes')) 
    : [];

    const transactionsFromStorage = localStorage.getItem('transactions') 
    ? JSON.parse(localStorage.getItem('transactions')) 
    : [];

    const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : {};

    const initialState = {
        loading: false,
        transactions: transactionsFromStorage,
        transactionTypes: transactionTypesFromStorage,
        error: false,
        total: 0
    }

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    // Functions
    const getTransactions = async () => {
        try {
            dispatch({
                type: GET_TRANSACTIONS_REQUEST
            });
            
            const { data } = await axiosClient.get('/api/transactions');
    
            // Get transactions
            dispatch({
                type: GET_TRANSACTIONS_SUCCESS,
                payload: data
            });

            localStorage.setItem('transactions', JSON.stringify(data));

        } catch (error) {
            dispatch({
                type: GET_TRANSACTIONS_FAIL,
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
            })
        }
    };

    const getTransactionTypes = async () => {
        try {
            dispatch({
                type: GET_TRANSACTION_TYPES_REQUEST
            });
            ;
            const { data } = await axiosClient.get('/api/transaction-types');
    
            // Get transactions
            dispatch({
                type: GET_TRANSACTION_TYPES_SUCCESS,
                payload: data
            });

            localStorage.setItem('transactionTypes', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: GET_TRANSACTION_TYPES_FAIL,
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
            })
        }
        
        
    };

    const addTransaction = async (transaction) => {
        try {
            dispatch({
                type: ADD_TRANSACTION_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfoFromStorage.token}`
                }
            };
    
            const { data } = await axiosClient.post('/api/transactions', transaction, config);
    
            dispatch({
                type: ADD_TRANSACTION_SUCCESS,
                payload: data
            });
    
        } catch(error) {
            dispatch({
                type: ADD_TRANSACTION_FAIL,
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
            })
        }
        
    };

    return (
        <transactionContext.Provider
            value={{
                loading: state.loading,
                transactions: state.transactions,
                transactionTypes: state.transactionTypes,
                error: state.error,
                total: state.total,
                getTransactions,
                getTransactionTypes,
                addTransaction
            }}
        >
            {props.children}
        </transactionContext.Provider>
    );

}

export default TransactionState;



