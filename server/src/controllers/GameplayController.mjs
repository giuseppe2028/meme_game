import {getIdMeme} from "../dao/MemeDAO.mjs";
import {getIdCaption} from "../dao/CaptionDAO.mjs";
import {
    addSingleRound,
    createGameplayDao, deleteGameplayDao,
    endGame,
    getIDCurrentGameplay,
    getPastGames,
    getRefMeme, getSpecificGameRounds, getTotalPointOfSingleGame
} from "../dao/GameplayDao.mjs";
import {AnswerJustInserted, NotFinishedGameplay, NotFoundError, NotGameFoundError} from "../errors/ServerError.mjs";

export function registerAllrounds(user,body){
    return new Promise( async (resolve, reject) => {
        try {
            const idGame = await getIDCurrentGameplay(user.username)
            if(idGame === undefined){
                reject(new NotGameFoundError())
            }

            //take the rounds:
            const rounds = body.rounds

            for (const round of rounds) {

                const idMeme = await getIdMeme(round.meme)
                const idCaption = await getIdCaption(round.caption_selected)
                const score = await calculateScore(round.meme,round.caption_selected)

                await addSingleRound(user.username,idMeme,idGame,idCaption,round.round_number,score)


            }
            resolve(true)
        } catch (err) {
            reject(err);
        }
    })
}

async function calculateScore(meme, caption) {
    if(caption === "None") return parseInt('0');
    const retriveNameImage = await getRefMeme(caption)
    if(retriveNameImage===meme){
        return parseInt('5');
    }
    else{
        return parseInt('0');
    }
}

export async function createGameplay(user) {
    //check if there is a gameplay not finished:

    if(await getIDCurrentGameplay(user.username) !== undefined){
        throw new NotFinishedGameplay()
    }

    return await createGameplayDao(user.username)
}

export async function getIdGamplay(user) {
    return await getIDCurrentGameplay(user.username)
}

export const getHistory = async (user) => {
    const games = await getPastGames(user.username)
    for(const game of games){
        game.rounds = await getSpecificGameRounds(game.id,user.username)
    }
    return games;

}



export const getRoundsOfCurrentGamePlay = async (user) => {
    const idCurrentGameplay = await getIDCurrentGameplay(user.username);
    return await getSpecificGameRounds(idCurrentGameplay,user.username)

}

export const deleteGameplay = async (user)=>{
    const currentID = await getIDCurrentGameplay(user.username)
    return await deleteGameplayDao(currentID)
}

export const endCurrentGame = async (user)=>{
        //check if a game is not finished
        const currentID = await getIDCurrentGameplay(user.username)
    if(currentID === undefined)
        throw new NotGameFoundError()
        const total = await calculateTotal(currentID,user)
        return await endGame(currentID,user.username,total)



}

const calculateTotal = async (currentId,user)=>{
    return await getTotalPointOfSingleGame(user,currentId)
}
