import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {addGame} from "../../network/API.js";
import * as API from "../../network/API.js";
import {useContext} from "react";
import UserContext from "../../Context/userContext.js";
export function BottomNavBar(props){
    const addGameplay = async (username) => {
        console.log(props.rounds)
        if(username.username !== "Guest"){
            await API.addAllRounds(makeBody(props.rounds))
            await API.endGameplay({"result":props.point})
            await addGame(username);
        }

        navigate('/gamePlay');


    }
    const navigate = useNavigate()
    const { usernameContext } = useContext(UserContext);
    const storeResultAndGoHome=async () => {
        if(usernameContext !== "Guest"){
            await API.addAllRounds(makeBody(props.rounds))
            await API.endGameplay()
        }
        navigate('/home')
    }

    return(
        <Row className="mt-5">
            <Col className="d-flex justify-content-start">
                <Button className="py-3 px-4 mb-3 rounded-pill" variant="warning" onClick={()=>addGameplay({username: usernameContext})}><i className="bi bi-arrow-clockwise me-2"></i> Ricomincia</Button>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button className="py-3 px-4 mb-3 rounded-pill" variant="danger" onClick={()=>storeResultAndGoHome()}>
                    <i className="bi bi-house me-2"></i>Torna alla Home
                </Button>
            </Col>
        </Row>

    );
}

const makeBody = (newRounds) => {
    return {
        rounds: newRounds.map(round => ({
            meme: round.meme,
            round_number: round.roundNumber,
            caption_selected: round.captionSelected
        }))
    };
};