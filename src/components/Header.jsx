import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

function Header() {
  const navigate = useNavigate()
  const logout = ()=>{
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to logout from Tech Assist?",
        icon: "warning",
        dangerMode: true,
    })
    .then(loginout => {
    if (loginout) {
        sessionStorage.removeItem("UserEmail")
        navigate('/user-login')
        swal("Logged out!", "Your are successfully logged out of the website!", "success");
    }
    });
    
}
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg='primary' data-bs-theme='dark' className="bg-body-tertiary shadow m-4 rounded-pill">
      <Container>
        <Navbar.Brand href="#home " className='fs-4'><i className="fa-brands fa-slack fs-4"></i> User Managment</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Tech Assist</Nav.Link>
            <Nav.Link href="#pricing">Access More</Nav.Link>
          </Nav>
          <Nav className="ms-auto ">
            {/* <a href='/user-login' className='btn btn-info rounded-pill px-3'>Login</a> */}
            <a onClick={logout} className='btn btn-danger rounded-pill px-3'>Log out</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header