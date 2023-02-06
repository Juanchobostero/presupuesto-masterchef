import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { transactionContext } from '../context/transaction/transactionContext';

const Listado = ({ transacciones }) => {

    const transContext = useContext(transactionContext);
    const { loading, transactions, error, getTransactions } = transContext;

    useEffect(() => {
        getTransactions();
      console.log(transactions);
    }, []);
    

    return(
        <div className="gastos-realizados">
            <h2>Listado</h2>
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
                    {/* { transactions.length > 0 
                        ? (transactions.map((transaccion) => (
                            <tr key={transaccion.id}>
                                <td>{transaccion.descripcion}</td>
                                <td>{transaccion.monto}</td>
                            </tr>
                        ))) 
                        : (
                            <h3>No data PUTO</h3>
                        )

                    } */}
                    
                </tbody>
            </table>
        </div>
    )
}

Listado.propTypes = {
    transacciones: PropTypes.array.isRequired
}
 
export default Listado;