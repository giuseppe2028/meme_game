import {Card} from "react-bootstrap";
import {ProfileIcon} from "../Common/Icons.jsx";
import "../Profile/ProfileCard.css"
import {ButtonNavProfile} from "./ButtonNavProfile.jsx";
export function ProfileCard(props){
    return(
 <>
     <Card className="ProfileCard ms-xl-5 rounded-4 mt-4 pt-5 bg-body-tertiary">
         <div className="center">
             <ProfileIcon height="70" width="70" />
         </div>
         <Card.Body className="d-flex flex-column align-items-start">
             <Card.Title className="text-center"><h2>Informazioni personali</h2></Card.Title>
             <Card.Text>
                 <span className="profile-info me-2">Username:</span>
                 <span>{props.personalInfo.username}</span>
             </Card.Text>
             <Card.Text>
                 <span className="profile-info me-2">Nome:</span>
                 <span>{props.personalInfo.name}</span>
             </Card.Text>
             <Card.Text>
                 <span className="profile-info me-2">Cognome:</span>
                 <span>{props.personalInfo.surname}</span>
             </Card.Text>
             <Card.Text>
                 <span className="profile-info me-2">Mail:</span>
                 <span>{props.personalInfo.mail}</span>
             </Card.Text>
             <Card.Text>
                 <span className="profile-info me-2">Partite giocate:</span>
                 <span>{props.personalInfo.totalMatch}</span>
             </Card.Text>
             <Card.Text>
                 <span className="profile-info me-2">Punteggio totale:</span>
                 <span>{props.personalInfo.totalScore}</span>
             </Card.Text>
         </Card.Body>
     </Card>
     <ButtonNavProfile/>
 </>
    );
}



