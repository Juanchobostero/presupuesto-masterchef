import { 
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,
    GET_TRANSACTION_TYPES_REQUEST,
    GET_TRANSACTION_TYPES_SUCCESS,
    GET_TRANSACTION_TYPES_FAIL,
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAIL
} from "../../types";

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS_REQUEST:
            return {
                loading: true,
                transactions: [],
            }    
        case GET_TRANSACTIONS_SUCCESS: 
            return {
                loading: false,
                transactions: action.payload,
                error: false
            }
            
        case GET_TRANSACTIONS_FAIL:
            return {
                loading: false,
                error: true
            }
        case ADD_TRANSACTION_REQUEST:
            return {
                loading: true,
                transactions: [...state.transactions]
            }
        case ADD_TRANSACTION_SUCCESS:
            return {
                loading: false,
                transactions: [...state.transactions, action.payload]
            }
        case ADD_TRANSACTION_FAIL:
            return {
                transactions: [...state.transactions],
                loading: false,
                error: true
            }
        case GET_TRANSACTION_TYPES_REQUEST:
            return {
                transactionTypes: []
            }
        case GET_TRANSACTION_TYPES_SUCCESS:
            return {
                transactionTypes: action.payload
            }
        case GET_TRANSACTION_TYPES_FAIL:
            return {
                transactionTypes: [],
                error: action.payload
            }
        default:
            return state;
    }
}