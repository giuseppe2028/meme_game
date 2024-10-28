import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as API from "../network/API.js";

import {Link} from "react-router-dom";
import {Round} from "../Models/Round.js";
import {LoadingSpinner} from "../Components /Common/LoadingSpinner.jsx";
import {ResultContent} from "../Components /ResultsGame/ResultContent.jsx";


export function HistoryPage(){

    const [games,setGames] = useState([]);
    const [rounds,setRounds] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [sorted,setSorted] = useState(false);

    useEffect(() => {
        const getResults = async ()=> {
            setIsLoading(true);
            const response = await API.getHistoryGame();
            setGames(response);
            setIsLoading(false);
        }
        getResults();

    }, []);

    const OrderBy = (mode) => {
        let sortedGames = [...games];
        if (mode === 'match') {
            if (sorted) {
                sortedGames.sort((a, b) => b.id - a.id);
                setSorted(false);
            } else {
                sortedGames.sort((a, b) => a.id - b.id);
                setSorted(true);
            }
        } else if (mode === 'date') {
            if (sorted) {
                sortedGames.sort((a, b) => new Date(b.date) - new Date(a.date));
                setSorted(false);
            } else {
                sortedGames.sort((a, b) => new Date(a.date) - new Date(b.date));
                setSorted(true);
            }
        } else if (mode === 'score') {
            if (sorted) {
                sortedGames.sort((a, b) => b.totalScore - a.totalScore);
                setSorted(false);
            } else {
                sortedGames.sort((a, b) => a.totalScore - b.totalScore);
                setSorted(true);
            }
        }
        setGames(sortedGames); // Aggiorno lo stato con l'array ordinato
    }

    const handleDetailsClick = (game) => {
        if (selectedGameId === game.id) {
            setSelectedGameId(null);
        } else {
            setRounds(game.rounds.map(round => new Round(round.meme, round.round_number, round.caption_selected, round.score)));
            setSelectedGameId(game.id);
        }
    }

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            <div className="mx-5 mt-4 mb-4">
                <h1 className="flex center">Risultati</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Partita <Button onClick={() => OrderBy('match')} className="ms-2" variant="link"> <i className="bi bi-arrow-down-up"></i></Button></th>
                        <th>Data <Button onClick={() => OrderBy('date')} className="ms-2" variant="link"> <i className="bi bi-arrow-down-up"></i></Button> </th>
                        <th>Punteggio <Button onClick={() => OrderBy('score')} className="ms-2" variant="link"> <i className="bi bi-arrow-down-up"></i></Button> </th>
                        <th>Dettagli</th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => (
                        <TableRow key={index} game={game} onDetailsClick={handleDetailsClick} />
                    ))}
                    </tbody>
                </Table>
                {selectedGameId && <ResultContent rounds={rounds}/>}
                <Link to="/home" className="btn btn-primary py-3 px-4 mb-3 rounded-pill">
                    <i className="bi bi-arrow-left"></i> Torna alla home
                </Link>
            </div>
        </>
    );
}

function TableRow(props) {
    return (
        <tr>
            <td>{props.game.id}</td>
            <td>{props.game.date}</td>
            <td>{props.game.totalScore}</td>
            <td>
                <Button variant="link" onClick={() => props.onDetailsClick(props.game)}>
                    Dettagli
                </Button>
            </td>
        </tr>
    );
}
