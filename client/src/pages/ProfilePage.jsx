import {ProfileCard} from "../Components /Profile/ProfileCard.jsx";
import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as API from "../network/API.js";
import {LoadingSpinner} from "../Components /Common/LoadingSpinner.jsx";
import {PersonalInformation} from "../Models/PersonalInformation.mjs";


export function ProfilePage(){

    const [isLoading,setIsLoading] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(new PersonalInformation("","","","",0,0));

    useEffect(() => {
        const getPersonalInfo = async ()=> {
            setIsLoading(true)
            const response = await API.getPersonalInfo();
            setPersonalInfo(response)
            setIsLoading(false)
        }
        getPersonalInfo();
    }, []);
    return (
        <>
            {isLoading &&  <LoadingSpinner/>}
            <Container fluid>
                <Row className="flex-fill justify-content-center ">
                    <ProfileCard personalInfo = {personalInfo}/>
                </Row>
            </Container>
        </>

    );
}

