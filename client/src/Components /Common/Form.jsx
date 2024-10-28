import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Styles/FormStyle.css"
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../network/API.js";
import UserContext from "../../Context/userContext.js";
export function CustomForm(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUsernameContext} = useContext(UserContext)

    const handleSubmit = async (event) => {

        event.preventDefault();
        const bodyElement = { password: password, username: username };

        try {
            props.setIsLoading(true)
            const response = await login(bodyElement);
            setUsernameContext(response.username);
            navigate('/home');

        } catch (error) {
            props.setError(true)
        }
        props.setIsLoading(false)
    };


    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username address</Form.Label>
                <Form.Control type="username" placeholder="Enter username" required={true} minLength={2} value={username} onChange={(event) => setUsername(event.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required={true} minLength={2} value={password} onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="buttonSubmit">
                {props.buttonText}
            </Button>
        </Form>
    );
}