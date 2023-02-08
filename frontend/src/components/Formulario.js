import React, { useContext, useEffect, useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from "prop-types";
import { transactionContext } from '../context/transaction/transactionContext';
import Swal from 'sweetalert2';

const Formulario = () => {
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState(null);
    const [monto, setMonto] = useState(0);

    const transContext = useContext(transactionContext);
    const { addTransaction, transactionTypes, getTransactionTypes } = transContext;


    //Cuando el user agrega un gasto
    const addtransaccion = e => {
        e.preventDefault();

        //Validar 
        if(monto < 1 || isNaN(monto) || descripcion.trim() === "") {
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
    }

    useEffect(() => {
        if(!transactionTypes) {
            getTransactionTypes();
        }
    }, []);
    

    return(
        <form
            onSubmit={addtransaccion}
        >
            <h2>Agregá tu Gasto/Ingreso</h2>
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
                value="Agregar"
            />
        </form>
    );
    
}

Formulario.propTypes = {
    transactionTypes: PropTypes.array.isRequired
}
 
export default Formulario;