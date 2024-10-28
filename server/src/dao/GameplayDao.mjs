import User from "../components/User.mjs";
import {db} from "../db/db.mjs";
import dayjs from "dayjs";
import {Game} from "../components/Game.mjs";
import {Round} from "../components/Round.mjs";
import {AnswerJustInserted, NotFoundError, NotGameFoundError} from "../errors/ServerError.mjs";


export const addSingleRound = (username,meme,game,caption,roundNumber,score)=>{

    return new Promise((resolve, reject)=>{
            const sql = "insert into Round(ref_player,ref_meme,ref_caption,ref_game,round_number,score) values (?,?,?,?,?,?)";
            db.run(sql,[username,meme,caption,game,roundNumber,score],(err)=>{
                if(err){
                    if(err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: Round.ref_player, Round.ref_meme, Round.ref_game")){
                        reject(new AnswerJustInserted())
                    }
                    reject(err);
                    return;
                }
                resolve(true);
            })
        }
    )
}

export const createGameplayDao = (username)=>{
    return new Promise((resolve,reject)=>{
        const sql = "insert into Game(ref_player) values (?)";
        db.run(sql,[username],(err)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(true)
        })
    })
}

export const getIDCurrentGameplay = (username)=>{
    const sql = "select id_game from Game where ref_player = ? and finish = 0";
    return new Promise((resolve,reject)=>{
        db.get(sql,[username],(err,row)=>{
            if(err) reject(err)
            if(!row){
                resolve()
                return
            }
            resolve(row.id_game)
        })
    })
}

export const deleteGameplayDao = (gameId)=>{
    return new Promise((resolve, reject)=>{
        const sql = "delete from Game where id_game = ?";
        db.run(sql,[gameId],(err)=>{
            if(err) reject(err)
            resolve()
        })
    })
}
export const endGame = (currentId,username,result)=>{
    return new Promise((resolve,reject)=>{
        const sql = "update Game set finish = 1, date = ?, result = ? where ref_player = ? and id_game = ?";
        db.run(sql,[dayjs().format('YYYY-MM-DD'),result,username,currentId],(err)=>{
            if(err) reject(err)

            resolve()
        })
    })
}

export const getPastGames = (user)=>{
    return new Promise((resolve, reject)=>{
        const sql = "select * from Game where ref_player = ? and finish = 1";
        db.all(sql,[user],(err,rows)=>{

            if(err) reject(err)

            resolve(rows.map(row => new Game(row.id_game,row.date,row.ref_player,row.result,[])))

        })
    })
}

export const getSpecificGameRounds = (idGame,username)=>{
    return new Promise((resolve, reject)=>{
        const sql = "select * from Round R,Caption,Meme where ref_game = ? and ref_player = ? and ref_caption = id_caption and R.ref_meme = id_meme";
        db.all(sql,[idGame,username],(err,rows)=>{
            if(err) reject(err)
            resolve(rows.map(row=>new Round(row.name_image,row.round_number,row.description,row.score)))
        })
    })
}

export const getRefMeme = (caption)=>{
    return new Promise((resolve,reject)=>{
        const sql = "select name_image from Caption,Meme where description = ? and ref_meme = id_meme";
        db.get(sql,[caption],(err, row)=>{
            if(err) reject(err)
            resolve(row.name_image)
        })
    })
}


export const getTotalMatches = (user)=>{
    return new Promise((resolve,reject)=>{
        const sql = "select count(*) as total_match from Game where ref_player=?";
        db.get(sql,[user.username],(err, row)=>{
            if(err) reject(err)
            resolve(row.total_match)
        })
    })
}

export const getTotalPoint = (user)=>{
    return new Promise((resolve,reject)=>{
        const sql = "select SUM(result)  as total_score from Game where ref_player=?";
        db.get(sql,[user.username],(err, row)=>{
            if(err) reject(err)
            if(row.total_score === null) resolve(0)
            resolve(row.total_score)
        })
    })
}

export const getTotalPointOfSingleGame = (user,gameId)=>{
    return new Promise((resolve,reject)=>{
        const sql = "select SUM(score)  as total_score from Round where ref_player=? and ref_game=?";
        db.get(sql,[user.username,gameId],(err, row)=>{
            if(err) reject(err)
            if(row.total_score === null) resolve(0)
            resolve(row.total_score)
        })
    })
}
