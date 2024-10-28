import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function ButtonNavProfile(){
    const navigate = useNavigate();
    return(
        <Row className="mt-5">
            <Col className="d-flex justify-content-around">
                <Button className="py-3 px-4 mb-3 rounded-pill" variant="primary" onClick={()=>navigate('/home')}><i
                    className="bi bi-house me-2"></i> Torna alla home</Button>
            </Col>
            <Col className="d-flex justify-content-around">
                <Button variant="link" onClick={()=>navigate('/history')}>
                    <i className="bi bi-clock-history me-2"></i>
                    Visualizza Cronologia
                </Button>
            </Col>
        </Row>
    );
}