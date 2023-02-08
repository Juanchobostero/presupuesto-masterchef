import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { transactionContext } from '../context/transaction/transactionContext';
import Loader from './Loader';
import Message from './Message';

const Listado = () => {
    const transContext = useContext(transactionContext);
    const { loading, error, transactions, getTransactions } = transContext;

    useEffect(() => {
        if(!transactions) {
            getTransactions();
        }
    }, []);
    
    
    return(
        <div className="gastos-realizados">
            <h2>Listado</h2>
            {loading && (<Loader />)}
            {error && (<Message variant='danger'>{error}</Message>)} 
            <table>
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        transactions.length > 0 
                        ? (transactions.map((tr) => (
                            <tr key={tr._id}>
                                <td>{tr.description}</td>
                                <td>{tr.amount}</td>
                            </tr>
                        ))) 
                        : (
                            <tr><td>No data PUTO</td></tr>
                        )
    
                        
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

Listado.propTypes = {
    transactions: PropTypes.array.isRequired
}
 
export default Listado;