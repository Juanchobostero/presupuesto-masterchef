import React from 'react';
import Footer from "./components/Footer";
import TransactionState from './context/transaction/transactionState';
import UserState from './context/user/userState';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertState from './context/alerts/alertState';

function App() {

  return (
    <TransactionState>
      <UserState>
      <AlertState>
        <Router>
          <Header />
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          <Footer />
        </Router>
        </AlertState>
      </UserState>
    </TransactionState>
  );
}

export default App;
