import React, { useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";
import Footer from "./components/Footer";
import TransactionState from './context/transaction/transactionState';


function App() {

  const [diferencia, setDiferencia] = useState(0);
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

      //Actualiza total
      const total = diferencia + transaccion.monto;
      setDiferencia(total);

      //Resetear a false
      setCrearTransaccion(false);
    }
  }, [transaccion, crearTransaccion, transacciones, diferencia]);


  return (
    <TransactionState>
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
                total={diferencia}
              />
            </div>
          </div>
        </div>
      </header>
      <footer>
        <Footer />
      </footer>
    </div>
    </TransactionState>
  );
}

export default App;
