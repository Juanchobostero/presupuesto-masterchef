import React from 'react';
import PropTypes from "prop-types";

const Transaccion = ({ transaccion }) => (
    <li className="gastos">
        <p>
            {transaccion.descripcion}

            <span className="gasto">$ {transaccion.monto}</span>    
        </p>
    </li>
)

Transaccion.propTypes = {
    transaccion: PropTypes.object.isRequired
}
 
export default Transaccion;
