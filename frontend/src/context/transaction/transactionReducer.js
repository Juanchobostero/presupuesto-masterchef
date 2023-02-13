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
                ...state
            }    
        case GET_TRANSACTIONS_SUCCESS: 
            return {
                loading: false,
                transactions: action.payload,
                ...state  
            }
            
        case GET_TRANSACTIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_TRANSACTION_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ADD_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
                totalBills: (action.payload.type === 'Gasto' ? state.totalBills + action.payload.amount : state.totalBills),
                totalIncomes: (action.payload.type === 'Ingreso' ? state.totalIncomes + action.payload.amount : state.totalIncomes),
                loading: false,
            }
        case ADD_TRANSACTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_TRANSACTION_TYPES_REQUEST:
            return {
                loading: true,
                ...state
            }
        case GET_TRANSACTION_TYPES_SUCCESS:
            return {
                loading: false,
                transactionTypes: action.payload,
                ...state
            }
        case GET_TRANSACTION_TYPES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}