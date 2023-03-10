import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import alertContext from '../context/alerts/alertContext';
import { transactionContext } from '../context/transaction/transactionContext';

const Formulario = ({ transactionTypes }) => {

    const alertsContext = useContext(alertContext);
    const { alert } = alertsContext;

    const transContext = useContext(transactionContext);
    const { addTransaction, getTransactions } = transContext;

    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState(0);
    const [monto, setMonto] = useState(0);


    //Cuando el user agrega un gasto
    const addtransaccion = e => {
        e.preventDefault();

        //Validar 
        if(monto < 1 || isNaN(monto) || descripcion.trim() === "" || tipo === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios !',
              })
            return;
        }

        //Construir la transacción y pasarla al método
        addTransaction({
            description: descripcion,
            transactionType: tipo,
            amount: monto
        })
        
        //Resetear el form
        setDescripcion("");
        setMonto(0);

        getTransactions();
    }

    
    

    return(
        <form
            onSubmit={addtransaccion}
        >
            <h3>Agregar nuevo</h3>
            <hr></hr>
            { alert && <div className={`alerta ${alert.category}`}>{ alert.msg }</div>}
            <div className="campo">
                <label>Nombre</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Tipo</label>
                <select 
                    value={tipo} 
                    onChange={e => setTipo(e.target.value)}
                    className="u-full-width"
                >
                    <option value={0}>
                        {'Seleccionar'}
                    </option>
                    {transactionTypes.map((type) => (
                        <option value={type._id} key={type._id}>
                            {type.description}
                        </option>
                    ))}
                </select>
            </div>
            <div className="campo">
                <label>Monto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={monto}
                    onChange={e => setMonto(parseInt(e.target.value))}
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                value="AGREGAR"
            />
        </form>
    );
    
}
 
export default Formulario;