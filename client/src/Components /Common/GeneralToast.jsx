import {Button, Container, Row, Toast, ToastContainer} from "react-bootstrap";
import "../Common/Styles/GeneralToast.css";

export function GeneralToast(props) {
    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast
                className="d-inline-block m-1"
                bg={props.variant}
                show={props.show}
                onClose={() => props.onClose()}
            >
                <Toast.Header>
                    <img
                        src="/WhatDoYouMemeLogo.png"
                        height={25}
                        width={25}
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">What do you meme?</strong>
                    <small>Ora</small>
                </Toast.Header>
                <Toast.Body>
                    {
                        props.variant === 'light'
                            ? <BodyToast wrongAnswer={props.errorInformation.wrongAnswer}
                                         correctAnswers={props.errorInformation.correctAnswers}/>
                            : <h5 className="text-white">{props.message}</h5>
                    }
                    <hr className="mx-2"/>
                    <div className="d-flex justify-content-end">
                        <Button className="my-2" onClick={()=>props.onClose()}>Next</Button>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}



function BodyToast(props) {
    return (
        <Container>
            <Row className="mb-3 fw-bold">
                La Risposta da te fornita non è corretta. La risposta scelta da te è:
            </Row>
            <Row className="mb-3 answerWrong">
                {props.wrongAnswer}
            </Row>
            <Row className="mb-3 fw-bold">
                La Risposta corretta invece è:
            </Row>
            {props.correctAnswers.map((correctAnswer) =>
                <Row key={correctAnswer.description} className="mb-3 answerCorrect">
                    {correctAnswer.description}
                </Row>
            )}
        </Container>
    );
}

export function WariningToast(props){
    return(
        <ToastContainer position="top-center" className="p-3">
            <Toast
                className="d-inline-block m-1"
                bg="warning"
                show={props.show}
                onClose={() => props.onClose()}
            >
                <Toast.Header>
                    <img
                        src="/WhatDoYouMemeLogo.png"
                        height={25}
                        width={25}
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">What do you meme?</strong>
                    <small>Ora</small>
                </Toast.Header>
                <Toast.Body>
                    <BodyWarningToast/>
                    <div className="d-flex justify-content-end">
                        <Button className="my-2" onClick={() => props.onClose()}>Next</Button>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}


function BodyWarningToast() {
    return (
        <>
            <Container>
                <Row className="mb-3 fw-bold">
                    Spiacenti, il tempo a tua disposizione è scaduto
                </Row>
            </Container>
        </>
    );
}