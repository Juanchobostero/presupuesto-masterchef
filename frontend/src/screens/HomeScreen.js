import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ControlPresupuesto from '../components/ControlPresupuesto';
import Formulario from '../components/Formulario';
import Listado from '../components/Listado';
import TableList from '../components/TableList';
import { transactionContext } from '../context/transaction/transactionContext';
import { userContext } from '../context/user/userContext';

const HomeScreen = () => {
  const navigate = useNavigate();

  const usersContext = useContext(userContext);
  const { userInfo } = usersContext;

  const transContext = useContext(transactionContext);
  const { 
    getTransactions, 
    getTransactionTypes, 
    transactions,
    transactionTypes,
  } = transContext;

  useEffect(() => {
    
    if(userInfo && userInfo.name) {
      getTransactionTypes();
      getTransactions();
    } else {
      getTransactionTypes();
      getTransactions();
      navigate('/login');
    }
  
  }, [transactions, transactionTypes, userInfo, navigate]);

  return (
    <div className="contenido-principal contenido">
      
        <div className="row mb-2">
          <div className="col-md-4 col-sm-6">
              <Formulario transactionTypes={transactionTypes}/>
          </div>
          <div className="col-md-8 col-sm-6">
              <TableList id="table-data" transactions={transactions}/>
          </div>
        </div>
        <div className='row'>
            <div className="col-md-12 col-sm-12">
              <ControlPresupuesto />
            </div>
          </div>
        
    </div>
  )
}

export default HomeScreen