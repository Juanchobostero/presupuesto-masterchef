import React, { useContext, useEffect } from 'react';
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
  const { loading, error, transactionTypes, transactions, getTransactions, getTransactionTypes, addTransaction } = transContext;

  useEffect(() => {
    
    if(userInfo && userInfo.name) {
      getTransactionTypes();
      getTransactions();
    } else {
      navigate('/login');
    }
  
  }, [userInfo, navigate]);

  return (
    <div className="contenido-principal contenido">
        <div className="row">
          <div className="col-md-4 col-sm-6">
              <Formulario transactionTypes={transactionTypes} addTransaction={addTransaction}/>
          </div>
          <div className="col-md-8 col-sm-6">
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