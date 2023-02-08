import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { userContext } from '../context/user/userContext';
import Swal from 'sweetalert2';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usersContext = useContext(userContext);
    const { loading, userInfo, error, login } = usersContext;

    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/';
  
    useEffect(() => {
        if(userInfo && userInfo._id) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);
    

    const submitHandler = (e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos incompletos !',
              })
            return;
        }

        // DISPATCH LOGIN
        login(email, password);
    }
  
  return (
    <FormContainer className='login'>
        <h1>Iniciar sesión para continuar</h1>
        <br></br>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <div className="contenido-principal contenido">
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Ingresá tu Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Ingresá tu Contraseña' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>

                <Button type='submit' variant='success' className='btn-login'>
                    INGRESAR
                </Button>
            </Form>
        </div>
        

    </FormContainer>
  )
}

export default LoginScreen