import React, { useReducer } from "react";
import userReducer from "./userReducer.js";
import { userContext } from "./userContext.js";
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from "../../types";
import axiosClient from "../../config/axios.js";

const UserState = props => {

    const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : {};

    const initialState = {
        loading: false,
        userInfo: userInfoFromStorage,
        error: false
    }

    const [state, dispatch] = useReducer(userReducer, initialState);

    // FUNCTIONS
    const login = async (email, password) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            });
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            const { data } = await axiosClient.post('/api/users/login', { email, password }, config);
    
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });
    
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch(error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
            })
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('transactions');
        localStorage.removeItem('transactionTypes');
        dispatch({ type: USER_LOGOUT });
    };

    /* 
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
        
    }; */


    return (
        <userContext.Provider
            value={{
                loading: state.loading,
                userInfo: state.userInfo,
                error: state.error,
                login,
                logout
            }}
        >
            {props.children}
        </userContext.Provider>
    );

}

export default UserState;



