import React, { useState } from 'react';
import Error from './Error';
import PropTypes from "prop-types";

const Pregunta = ({ setPresupuesto, setRestante, setMostrarPregunta }) => {

    //Definir el state
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    //Función que lee el presupuesto
    const handleCantidad = e => {
        setCantidad(parseInt(e.target.value));
    }

    //Submit para definir el presupuesto
    const addPresupuesto = e => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad)) {
            setError(true);
            return;
        }

        //Si se pasa la validación
        setError(false);
        setPresupuesto(cantidad);
        setRestante(cantidad);
        setMostrarPregunta(false);
    }

    return ( 
        <>
            <h2>Coloca tu Presupuesto</h2>

            {error ? <Error msg="El Presupuesto es incorrecto !"/> : null}

            <form
                onSubmit={addPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu Presupuesto"
                    onChange={handleCantidad}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />
            </form>
        </>
     );
}

Pregunta.propTypes = {
    setPresupuesto: PropTypes.func.isRequired,
    setRestante: PropTypes.func.isRequired,
    setMostrarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;