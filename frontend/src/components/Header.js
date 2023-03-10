import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/user/userContext';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

  const usersContext = useContext(userContext);
  const { userInfo, logout } = usersContext;

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  }
  
  return (
    <header>
      <Navbar className='menu'>
        <Container>
          <Navbar.Text className='title'>MASTER CHEF | <span>Delicias</span></Navbar.Text>
          <Navbar.Toggle />
          { userInfo && userInfo.name 
            ? (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className='user-text'>
                  Bienvenido: <span>{ userInfo.name } | <b className='logout' onClick={logoutHandler}>SALIR</b></span>
                </Navbar.Text>
              </Navbar.Collapse>
            ) 
            : null
          }
          
        </Container>
    </Navbar>
    </header>
  )
}

export default Header