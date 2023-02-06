import React from 'react';
import PropTypes from "prop-types";

const Listado = ({ transacciones }) => {
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
                    {transacciones.map((transaccion) => (
                        <tr key={transaccion.id}>
                            <td>{transaccion.descripcion}</td>
                            <td>{transaccion.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Listado.propTypes = {
    transacciones: PropTypes.array.isRequired
}
 
export default Listado;