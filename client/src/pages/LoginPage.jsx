import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginComponent} from "../Components /Login/LoginComponent.jsx";
import React, {useState} from "react";
import {CustomToast} from "../Components /Common/CustomToast.jsx";
import {LoadingSpinner} from "../Components /Common/LoadingSpinner.jsx";

export function LoginPage(){
    const [error,setError] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const userContext = React.createContext('');
    return(
        <>
            {error && <CustomToast message={"Incorrect Mail e/o Password"} close = {()=>setError(false)}/>}
            {isLoading && <LoadingSpinner/>}
        <div className="min-vh-100 d-flex flex-column">
            <Container fluid className=" LoginPage flex-grow-1 d-flex flex-column">
                <Row className="flex-grow-1 justify-content-center align-items-center">
                    <Col sm={6} className="text-center">
                        <img src="/WhatDoYouMemeLogo.png" width={500} height={400} alt="page 404"/>
                    </Col>
                    <Col sm={4}>
                    <LoginComponent setError = {setError} setIsLoading = {setIsLoading}/>
                    </Col>
                </Row>
            </Container>
        </div>
        </>

    );
}