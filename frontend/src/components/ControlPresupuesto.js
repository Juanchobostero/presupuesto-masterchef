import React from 'react';
import { revisarPresupuesto } from "../helpers";
import PropTypes from "prop-types";

const ControlPresupuesto = ({ total }) => {
    return ( 
        <>
            <div className="alert alert-primary">
                Total Gastos: {total}
            </div>

            <div className={revisarPresupuesto(total)}>
                Total Ingresos: {total}
            </div>

        </>
     );
}

ControlPresupuesto.propTypes = {
    total: PropTypes.number.isRequired
}
 
export default ControlPresupuesto;