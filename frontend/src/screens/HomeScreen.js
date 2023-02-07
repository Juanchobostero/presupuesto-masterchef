import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControlPresupuesto from '../components/ControlPresupuesto';
import Formulario from '../components/Formulario';
import Listado from '../components/Listado';
import { userContext } from '../context/user/userContext';

const HomeScreen = () => {
  const [diferencia, setDiferencia] = useState(0);
  const [transacciones, setTransacciones] = useState([]);
  const [transaccion, setTransaccion] = useState({});
  const [crearTransaccion, setCrearTransaccion] = useState(false);

  const navigate = useNavigate();

  const usersContext = useContext(userContext);
  const { userInfo } = usersContext;

  useEffect(() => {

    if(userInfo && userInfo.name) {
      console.log(userInfo);
    } else {
        navigate('/login');
    }

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
  
  }, [transaccion, crearTransaccion, transacciones, diferencia, userInfo, navigate]);

  return (
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
  )
}

export default HomeScreen