import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControlPresupuesto from '../components/ControlPresupuesto';
import Formulario from '../components/Formulario';
import Listado from '../components/Listado';
import { transactionContext } from '../context/transaction/transactionContext';
import { userContext } from '../context/user/userContext';

const HomeScreen = () => {
  const navigate = useNavigate();

  const usersContext = useContext(userContext);
  const { userInfo } = usersContext;
  const diferencia = 0;

  const transContext = useContext(transactionContext);
  const { loading, error, getTransactions, getTransactionTypes } = transContext;

  useEffect(() => {
    if(userInfo && userInfo.name) {
      console.log(userInfo);
    } else {
        navigate('/login');
    }
  
  }, [userInfo, navigate]);


  return (
    <div className="contenido-principal contenido">
        <div className="row">
          <div className="one-half column">
              <Formulario />
          </div>
          <div className="one-half column">
              <Listado />
              <ControlPresupuesto 
                total={diferencia}
              />
          </div>
        </div>
    </div>
  )
}

export default HomeScreen