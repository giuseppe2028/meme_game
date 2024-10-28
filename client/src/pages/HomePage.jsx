import {Button, Col, Container, Row} from "react-bootstrap";
import {GameRulesComponent} from "../Components /Home/GameRulesComponent.jsx";
import UserContext from "../Context/userContext.js";
import {addGame} from "../network/API.js";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CustomToast, CustomToasWithDeletet} from "../Components /Common/CustomToast.jsx";
import * as API from "../network/API.js";




export function HomePage(){

    const navigate = useNavigate();
    const { usernameContext } = useContext(UserContext);
    const [error,setError] = useState(false);
    const addGameplay = async (username) => {
        if(username.username !== "Guest"){
            try{
                await addGame(username);
                navigate('/gamePlay');
            }catch (err){
                if(err.message === "Conflict"  ){
                    setError(true)
                }
            }
        }else{
            navigate('/gamePlay');
        }

    }

    return (
        <>
            {error && <CustomToasWithDeletet delete={()=>{API.deleteCurrentGame(); setError(false)}} message = "Hai già un gameplay in corso, premi il tasto elmina per cancellarlo e continuare a giocare"/>}
            <Container fluid>
                <Row>
                    <h1 className="center mt-4">
                        Benvenuto In "What do you meme?"
                    </h1>
                </Row>
                <Row >
                    <Col xs = {4}>
                        <GameRulesComponent/>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Button className="PlayerButton rounded-pill" onClick={()=>addGameplay({username: usernameContext})}>
                            Gioca
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}