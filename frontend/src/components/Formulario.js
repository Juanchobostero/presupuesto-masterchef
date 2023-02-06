import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from "prop-types";

const Formulario = ({ setTransaccion, setCrearTransaccion }) => {

    const tipos = [
        { id: 1, descripcion: 'Gasto'},
        { id: 2, descripcion: 'Ingreso'},
    ];

    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState(tipos[0]);
    const [monto, setMonto] = useState(0); 
    const [error, setError] = useState(false);

    

    //Cuando el user agrega un gasto
    const addtransaccion = e => {
        e.preventDefault();

        //Validar 
        if(monto < 1 || isNaN(monto) || descripcion.trim() === "") {
            setError(true);
            return;
        }

        setError(false);

        //Construir la transacción
        const transaccion = {
            id: shortid.generate(),
            tipo,
            descripcion,
            monto
        }

        //Pasar el gasto al componente principal
        setTransaccion(transaccion);
        setCrearTransaccion(true);
        
        //Resetear el form
        setDescripcion("");
        setMonto(0);
    }

    return(
        <form
            onSubmit={addtransaccion}
        >
            <h2>Agregá tu Gasto/Ingreso</h2>
            {error ? <Error msg="Ambos campos son obligatorios o Presupuesto incorrecto"/> : null}
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
                    {tipos.map((tipo) => (
                        <option value={tipo.id} key={tipo.id}>
                            {tipo.descripcion}
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
    setTransaccion: PropTypes.func.isRequired,
    setCrearTransaccion: PropTypes.func.isRequired,
}
 
export default Formulario;