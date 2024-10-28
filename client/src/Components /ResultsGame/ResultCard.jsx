import {Card, Col, Container, Row} from "react-bootstrap";
import {ResultContent} from "./ResultContent.jsx";
import "../Common/Styles/ResultCard.css"
export function ResultCard(props){

    return(
        <Card className="rounded-4 pt-3 px-2 text-center">
            <Card.Body className="ResultContent">
                <Card.Header className="display-6">Risultati</Card.Header>
                {props.rounds.filter(round=>round.score===5).length > 0
                    ? <ResultContent rounds = {props.rounds.filter(round=>round.score===5)}/>
                    : <h2 className="my-4">Nessun elemento</h2>}
            </Card.Body>
            <Card.Footer>
                <Container className="flex-column justify-content-center">
                    <Row>
                        <Col>
                            <h5>Totale:</h5>
                        </Col>
                        <Col>
                            <h5>{props.point} pt</h5>
                        </Col>
                    </Row>
                </Container>
            </Card.Footer>
        </Card>
    );
}