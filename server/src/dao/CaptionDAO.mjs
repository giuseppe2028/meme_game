import {db} from "../db/db.mjs";

export const getIdCaption = (description)=>{
    return new Promise((resolve, reject)=>{
        const sql = "select id_caption from Caption where description = ?";
        db.get(sql,[description],(err,row)=>{
            if(err)
                reject(err)
            resolve(row.id_caption)
        })
    })
}