import React from 'react';
import { revisarPresupuesto } from "../helpers";
import PropTypes from "prop-types";

const ControlPresupuesto = ({ gastos, ingresos }) => {
    return ( 
        <>
            <div className="alert alert-primary">
                Total Gastos: {gastos}
            </div>

            <div className={revisarPresupuesto(gastos, ingresos)}>
                Total Ingresos: {ingresos}
            </div>

        </>
     );
}

ControlPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    restante: PropTypes.number.isRequired,
}
 
export default ControlPresupuesto;