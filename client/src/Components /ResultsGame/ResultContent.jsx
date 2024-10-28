import { Table } from "react-bootstrap";
import React from "react";

export function ResultContent(props) {

    return (
        <>

                <Table striped bordered hover className="mt-4">
                    <thead>
                    <tr>
                        <th>Round</th>
                        <th>Meme</th>
                        <th>Caption Selezionata</th>
                        <th>Risultato</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.rounds.sort((a,b)=>a.roundNumber-b.roundNumber).map((round, index) => (
                            <TableRow key={index} round={round} />
                        ))
                    }
                    </tbody>
                </Table>



        </>
    );
}

function TableRow({ round }) {
    return (
        <tr>
            <td>{round.roundNumber}</td>
            <td><img src={"http://localhost:3006/" + round.meme} className="img-fluid" width="100" height="100" alt="meme"/></td>
            <td>{round.captionSelected}</td>
            <td>{tableScoreText(round.score)}</td>
        </tr>
    );
}

function tableScoreText(score){
    if(score === 5)
        return <h6 className="">Risposta corretta (5 punti)</h6>
    else
        return <h6 >Risposta errata (0 punti)</h6>
}
