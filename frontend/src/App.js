import React, { useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";
import Footer from "./components/Footer";


function App() {

  const [restante, setRestante] = useState(0);
  const [transacciones, setTransacciones] = useState([]);
  const [transaccion, setTransaccion] = useState({});
  const [crearTransaccion, setCrearTransaccion] = useState(false);

  useEffect(() => {
    if(crearTransaccion) {

      //Agrega el nuevo presupuesto
      setTransacciones([
        ...transacciones,
        transaccion
      ]);

      //Resta del presupuesto actual
      const presupuestoRestante = restante - transaccion.cantidad;
      setRestante(presupuestoRestante);

      //Resetear a false
      setCrearTransaccion(false);
    }
  }, [transaccion, crearTransaccion, transacciones, restante]);


  return (
    <div className="container">
      <header>
        <h1>Gastos e Ingresos - Master Chef</h1>
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                setTransaccion={setTransaccion}
                setCrearTransaccion={setCrearTransaccion}
              />
            </div>
            <div className="one-half column">
              <Listado 
                transacciones={transacciones}

              />
              <ControlPresupuesto 
                total={restante}
              />
            </div>
          </div>
        </div>
      </header>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
