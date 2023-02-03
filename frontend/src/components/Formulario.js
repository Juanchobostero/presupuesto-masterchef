import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from "prop-types";

const Formulario = ({ setGasto, setCrearGasto }) => {

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0); 
    const [error, setError] = useState(false);

    //Cuando el user agrega un gasto
    const addGasto = e => {
        e.preventDefault();

        //Validar 
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
            setError(true);
            return;
        }

        setError(false);

        //Construir el Gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        setGasto(gasto);
        setCrearGasto(true);
        
        //Resetear el form
        setNombre("");
        setCantidad(0);
    }

    return(
        <form
            onSubmit={addGasto}
        >
            <h2>Agregá tus Gastos</h2>

            {error ? <Error msg="Ambos campos son obligatorios o Presupuesto incorrecto"/> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => setCantidad(parseInt(e.target.value))}
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                vallue="Agregar Gasto"
            />
        </form>
    );
    
}

Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setCrearGasto: PropTypes.func.isRequired,
}
 
export default Formulario;