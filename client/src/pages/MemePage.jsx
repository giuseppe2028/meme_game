import React, {useContext, useEffect, useState} from "react";
import {addAllRounds, getMemes, getSingleMeme} from "../network/API.js";
import {MemeContent} from "../Components /Meme/MemeContent.jsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import "../Components /Meme/MemeStyle.css"
import {BottomNavigation} from "../Components /Meme/BottomNavigation.jsx";
import {nextMemeState} from "../Hook/MemeHooks.jsx";
import {responseMemeHook} from "../Hook/ReponseMemeHook.jsx";
import {Timer} from "../Components /Meme/Timer.jsx";
import {Round} from "../Models/Round.js";
import UserContext from "../Context/userContext.js";
import {useNavigate} from "react-router-dom";
import {LoadingSpinner} from "../Components /Common/LoadingSpinner.jsx";
import {GeneralToast, WariningToast} from "../Components /Common/GeneralToast.jsx";



export function MemePage(){

    const [memes,setMemes] = useState([]);
    const [indexMeme,nextMeme] = nextMemeState()
    const [isLast,setIsLast] = useState(false)
    const [response,updateResponse] = responseMemeHook()
    const [selected, setSelected] = useState(false)
    const { usernameContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)
    const [showSuccessToast,setShowSuccessToast] = useState(false)
    const [showFailToast,setShowFailToast] = useState(false)
    const [errorInformation,setErrorInformation] = useState({wrongAnswer: "",correctAnswers: []});
    const [buttonDisable, setButtonDisable] = useState(false)
    const [running, setRunning] = useState(true);
    const [showTimeoutToast, setShowTimeoutToast] = useState(false)

    const onCloseToast = ()=>{
        disableToast()
        if(isLast){
            goToResult()
        }else{
            nextMeme()
        }
    }
    const disableToast = ()=>{
        if(showFailToast){
            setShowFailToast(false)
        }else if(showSuccessToast){
            setShowSuccessToast(false)
        }else{
            setShowTimeoutToast(false)
        }
    }

    const goToResult =() =>{

            const allMemeNames = memes.map(meme=>meme.name)
            const newRounds = response.map((response, index) => {
                return new Round(allMemeNames[index], index + 1, response.description,response.score);
            });
            navigate('/gamePlay/results',{state: newRounds})

    }
//memes[indexMeme].descriptions.filter(description => description.correct)
    const selectCorrectAnswers = ()=> memes[indexMeme].descriptions.filter(element=>element.correct)


    const goToNext = ()=>{

        if(response[indexMeme].score === 5){

            setShowSuccessToast(true)
        }else{

            setErrorInformation({wrongAnswer: response[indexMeme].description,correctAnswers: selectCorrectAnswers()})
            setShowFailToast(true)

        }
    }


    //Effect for managing next and previous navigation
    useEffect(() => {
        setSelected(true)
        setButtonDisable(false)
        if(indexMeme !== memes.length -1)
            setIsLast(false)
        else
            setIsLast(true)
    }, [indexMeme,memes]);



    useEffect(() => {
        setIsLoading(true)
        if(usernameContext === "Guest"){
            const fetchSingleMeme = async () => {
                const response = await getSingleMeme();
                setMemes([response])
            }
            fetchSingleMeme()
        }else{
            const fetchMeme = async () => {
                const response = await getMemes();
                setMemes(response)
            }
            fetchMeme()
        }
        setIsLoading(false)
    }, []);




    return(
        <>
            {isLoading && <LoadingSpinner/>}
            <WariningToast onClose = {onCloseToast} show = {showTimeoutToast} setShowToast = {setShowTimeoutToast} variant = "warning" message = "Complimenti, risposta corretta!!"/>
            <GeneralToast onClose = {onCloseToast} show = {showSuccessToast} setShowToast = {setShowSuccessToast} variant = "success" message = "Complimenti, risposta corretta!!"/>
            <GeneralToast onClose = {onCloseToast} show = {showFailToast} setShowToast = {setShowFailToast} variant = "light" errorInformation = {errorInformation} />
        <Container fluid >
            <Row className="mt-4 flex">
                <Col className="d-flex justify-content-between">
                    {memes.length > 0 ? <MemeContent buttonDisable = {buttonDisable} nextMeme = {nextMeme} memeElement={memes[indexMeme]} indexMeme={indexMeme} updateResponse={updateResponse} setSelected={setSelected} isLast={isLast}/> : <p>Loading memes...</p>}
                </Col>
            </Row>
            <Row>
                <Col className="mx-5">
                    <Timer setShowTimeoutToast = {setShowTimeoutToast} running = {running} setRunning = {setRunning} setButtonDisable = {setButtonDisable} updateResponse = {updateResponse} isLast={isLast} memeElement={memes[indexMeme]} nextMeme = {goToNext} indexMeme = {indexMeme}/>
                </Col>
            </Row>
            <Row className="mt-5 flex-grow-1">
                <Col className="mx-5 d-flex flex-column align-items-end">
                    <BottomNavigation buttonDisabled = {buttonDisable} setRunning = {setRunning} setButtonDisable = {setButtonDisable} nextMeme = {goToNext} isLast={isLast} selected = {selected} />
                </Col>
            </Row>
        </Container>

        </>


    );
}

