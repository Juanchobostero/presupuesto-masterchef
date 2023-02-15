import React, { useContext, useEffect } from 'react';
import { transactionContext } from '../context/transaction/transactionContext';

const ControlPresupuesto = () => {

    return ( 
        <div className='row'>
            <div className="alert alert-success col-md-6">
                Total Ingresos: {0}
            </div>
            <br></br>
            <div className="alert alert-danger col-md-6" /*className={revisarPresupuesto(total)}> */>
                Total Gastos: {0}
            </div>

        </div>
     );
}
 
export default ControlPresupuesto;