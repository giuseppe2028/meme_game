import {DescriptionInMeme, Meme} from "../Models/Meme.js";
import {PersonalInformation} from "../Models/PersonalInformation.mjs";

const SERVER_URL = 'http://localhost:3006';

const getData = async (url) => {
    return await fetch(SERVER_URL + url,{credentials: 'include'})
        .then(handleInvalidResponse)
        .then(response => response.json());

}
const postDataWithCredentials = async (url,bodyElement)=>{
    return  await fetch(SERVER_URL+url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(bodyElement),
    })
        .then(handleInvalidResponse)
        .then(response => response.json());
}


export const getMemes = async () => {

   const memeJson= await getData('/meme')
   return  memeJson.map(q => new Meme(q.name, q.description.map(descriptionElement => new DescriptionInMeme(descriptionElement.description, descriptionElement.correct))));

}

export const getSingleMeme = async () => {

    const memeJson= await getData('/meme/single')
    return new Meme(memeJson.name,memeJson.description.map(descriptionElement => new DescriptionInMeme(descriptionElement.description, descriptionElement.correct)))
}

export const login = (bodyElement) => {
    return postDataWithCredentials('/session/login', bodyElement)
        .then(response => {
            return response; // Puoi anche restituire dati specifici se necessario
        })
        .catch(error => {
            console.error('Error during login:', error.message);
            throw error; // Rilancia l'errore per gestirlo ulteriormente dove viene chiamata la funzione login
        });
};


export const addGame = async (bodyElement) =>{
    return await postDataWithCredentials('/gameplay', bodyElement)
}

export const addAllRounds = async (bodyElement) => {

    return await postDataWithCredentials('/gameplay/allRounds', bodyElement)
}

export const getResultsOfGame = async () =>{
    return getData('/gameplay/current/rounds')
}

export const endGameplay = async () => {
   await fetch(SERVER_URL + '/gameplay/end', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });
}

export const getHistoryGame = async ()=>{
    return await getData('/gameplay/history')
}

export const logout = async ()=>{
    const response = await fetch(SERVER_URL+'/session/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include'
    });

    return response
}
export const deleteCurrentGame = async () => {
     await fetch(SERVER_URL + '/gameplay', {
        method: 'DELETE',
        credentials: 'include'
    })
}

export const getPersonalInfo = async () => {
    const profileJson= await getData('/profile')
    return new PersonalInformation(profileJson.username,profileJson.name,profileJson.surname,profileJson.mail,profileJson.totalMatch,profileJson.totalScore)
}


function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

