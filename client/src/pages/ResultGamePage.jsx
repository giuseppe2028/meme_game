import {useContext, useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import {ResultCard} from "../Components /ResultsGame/ResultCard.jsx";
import {BottomNavBar} from "../Components /ResultsGame/BottomNavBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../Context/userContext.js";
export function ResultGamePage(){

    const [rounds, setRounds] = useState([]);
    const [point,setPoint] = useState(0);
    const location = useLocation()
    const newRounds = location.state;
    const { usernameContext } = useContext(UserContext);

    useEffect(() => {
        console.log(usernameContext)
        setRounds(newRounds)
    }, [newRounds]);

    useEffect(() => {
        let totalPoint = 0;
        rounds.forEach((round) => {
            totalPoint += round.score;
        });
        setPoint(totalPoint);

    }, [rounds]);


    return(
        <>
            <Container>
                <Row>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        {usernameContext !== 'Guest' ? <ResultCard rounds = {rounds} point = {point}/> : <SignupCard/> }
                    </div>
                </Row>
                <BottomNavBar rounds = {rounds} point = {point}/>
            </Container>
        </>
    );
}

function SignupCard(){
    return(
        <>
            <Container className="containerMessage d-flex flex-column align-items-center justify-content-center text-center p-4" >
                <h3 className="text-primary mb-4">Ops, hai terminato tutte le tue possibilità da utente guest!</h3>
                <p className="mb-4">Ti consigliamo di fare il login per avere più funzionalità.</p>
                <img src="/SignupPls.jpeg" className="rounded mb-4" alt="signup" style={{ width: '300px', height: '200px' }} />
            </Container>
        </>

    );
}