import React, { useContext } from 'react';
import { revisarPresupuesto } from "../helpers";
import PropTypes from "prop-types";
import { transactionContext } from '../context/transaction/transactionContext';

const ControlPresupuesto = () => {

    const transContext = useContext(transactionContext);
    const { 
        totalBills,
        totalIncomes,
        totalDiff
    } = transContext;

    return ( 
        <div className='row'>
            <div className="alert alert-success col-md-6">
                Total Ingresos: {totalBills}
            </div>
            <br></br>
            <div className="alert alert-danger col-md-6" /*className={revisarPresupuesto(total)}> */>
                Total Gastos: {totalIncomes}
            </div>

        </div>
     );
}
 
export default ControlPresupuesto;