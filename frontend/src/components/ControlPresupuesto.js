import React, { useContext, useEffect } from 'react';
import { transactionContext } from '../context/transaction/transactionContext';

const ControlPresupuesto = () => {

    const transContext = useContext(transactionContext);
    const { 
        totals,
        getTotals
    } = transContext;

    useEffect(() => {
      getTotals();
    }, [])
    

    return ( 
        <div className='row'>
            <div className="alert alert-success col-md-6">
                Total Ingresos: {totals[0].total}
            </div>
            <br></br>
            <div className="alert alert-danger col-md-6" /*className={revisarPresupuesto(total)}> */>
                Total Gastos: {totals[1].total}
            </div>

        </div>
     );
}
 
export default ControlPresupuesto;