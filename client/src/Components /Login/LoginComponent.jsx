import { Button, Card } from "react-bootstrap";
import "./LoginStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomForm } from "../Common/Form.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ProfileIcon } from "../Common/Icons.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Context/userContext.js";

export function LoginComponent(props) {
    const navigate = useNavigate();
    const { setUsernameContext } = useContext(UserContext);

    const submitAsGuest = () => {
        setUsernameContext('Guest');
        navigate('/home');
    };

    return (
        <Card className="LoginCard ms-xl-5 rounded-4 mt-3 pt-5">
            <div className="center">
                <ProfileIcon height="60" width="60" />
            </div>
            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">Login</Card.Title>
                <CustomForm setError = {props.setError} setIsLoading = {props.setIsLoading} buttonText="Login" className="mt-4" />
                <Button variant="link" onClick={submitAsGuest} className="d-flex justify-content-center mt-5">
                    Continua come guest
                </Button>
            </Card.Body>
        </Card>
    );
}
