import {Card} from "react-bootstrap";
import "./GameRule.css"
export function GameRulesComponent(){
    return (
        <Card className= "GameRule ms-xl-5 rounded-4 mt-3 pt-5">
            <div className= "center">
                <h2>Regole Di Gioco</h2>
            </div>
            <Card.Body className="CardBody">
                "What Do You Meme?" è un gioco di carte per 3 o
                più giocatori in cui si creano meme divertenti.
                Ogni giocatore riceve 7 carte Didascalia. Un giocatore
                viene scelto come giudice, ruolo che ruota ogni turno.
                Il giudice pesca una carta Immagine e la mostra.
                Gli altri giocatori selezionano una carta Didascalia dalla
                loro mano e la consegnano al giudice. Il giudice mescola le
                carte Didascalia, le legge ad alta voce e sceglie la combinazione
                più divertente. Il vincitore del turno prende la carta Immagine come
                punto. Alla fine del gioco, vince chi ha accumulato il maggior numero
                di carte Immagine.
            </Card.Body>
        </Card>
    );
}