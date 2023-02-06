import React from 'react';
import PropTypes from "prop-types";

const Transaccion = ({ transaccion }) => (
    <li className="gastos">
        <p>
            {transaccion.nombre}

            <span className="gasto">$ {transaccion.cantidad}</span>    
        </p>
    </li>
)

Transaccion.propTypes = {
    transaccion: PropTypes.object.isRequired
}
 
export default Transaccion;