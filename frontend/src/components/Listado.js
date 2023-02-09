import React, { useContext, useEffect } from 'react';
import { transactionContext } from '../context/transaction/transactionContext';
import Loader from './Loader';
import Message from './Message';

const Listado = () => {

    const transContext = useContext(transactionContext);
    const { transactions, loading, error } = transContext;
    

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
                        (transactions && transactions.length > 0) 
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

 
export default Listado;