import React from 'react';
//import Transaccion from './Transaccion';
import PropTypes from "prop-types";

const Listado = ({ transacciones }) => (
    <div className="gastos-realizados">
        <h2>Listado</h2>
        <table>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Descripcion</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Monto</th>
                </tr>
            </thead>
            <tbody>
                {transacciones.map((transaccion, index) => (
                    <tr>
                        <th scope='row'>{index+1}</th>
                        <td>{transaccion.descripcion}</td>
                        <td>{transaccion.tipo}</td>
                        <td>{Date.now()}</td>
                        <td>{transaccion.monto}</td>
                        {/* <Transaccion 
                            key={transaccion.id}
                            transaccion={transaccion}
                        /> */}
                    </tr>
                ))}
            </tbody>
        </table>
        

    </div>
)

Listado.propTypes = {
    transacciones: PropTypes.array.isRequired
}
 
export default Listado;