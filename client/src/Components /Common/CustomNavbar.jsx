import {Outlet, useNavigate} from "react-router-dom";
import './Styles/CustomNavBar.css'
import {ProfileIcon} from "./Icons.jsx";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as API from "../../network/API.js";
import {useContext} from "react";
import UserContext from "../../Context/userContext.js";
export function CustomNavbar(){
    const navigate = useNavigate()
    const { usernameContext } = useContext(UserContext);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary CustomNavBar">
                <Container>
                    <Navbar.Brand onClick={()=>{navigate('/home')}}>
                        <img
                            alt=""
                            src="WhatDoYouMemeLogo.png"
                            width="50"
                            height="40"
                            className="d-inline-block align-content-center me-3 "
                        />
                        What Do You Meme?
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto me-4">
                            {usernameContext === "Guest"
                                ?
                                <>
                                    <Navbar.Text className="me-3 text-white">Benvenuto {usernameContext} 👋🏻 </Navbar.Text>
                                    <Nav.Link onClick={()=>{ navigate('/login')}}>Torna al login</Nav.Link>
                                </>
                                : <DropDown/>}
                            <ProfileIcon width="36" height = "36" color = "white"/>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <Outlet/>
        </>

    );
}

function DropDown(){

    const navigate = useNavigate()
    const { usernameContext } = useContext(UserContext);

    return  <NavDropdown className="text-white flex justify-content-evenly me-2" title={`Benvenuto ${usernameContext} 👋🏻`} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => {navigate('/profile')}}>
            <i className="bi bi-person me-2"></i>
            Profilo
        </NavDropdown.Item>
        <NavDropdown.Item onClick={()=>{navigate('/history')}} >
            <i className="bi bi-clock-history me-2"></i>
            Cronologia
        </NavDropdown.Item>
        <NavDropdown.Item onClick={()=>{API.logout(); navigate('/login')}}>
            <i className="bi bi-box-arrow-right me-2 text-danger"></i>
            Logout
        </NavDropdown.Item>
    </NavDropdown>

}
