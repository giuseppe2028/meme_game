import {Button, Container, Row, Toast, ToastContainer} from "react-bootstrap";


export function CustomToast(props) {
    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast bg="danger" onClose={() => props.close()} show={true} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Errore</strong>
                    <small>Ora</small>
                </Toast.Header>
                <Toast.Body className="text-white">{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export function CustomToasWithDeletet(props) {
    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast bg="secondary" onClose={() => props.close()} show={true} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Errore</strong>
                    <small>Ora</small>
                </Toast.Header>
                <Toast.Body className="text-white">
                    <Container>
                        <Row>
                            {props.message}
                        </Row>
                        <Row className="mt-2">
                            <Button variant="danger" onClick={()=>props.delete()}>Elimina</Button>
                        </Row>
                    </Container>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}