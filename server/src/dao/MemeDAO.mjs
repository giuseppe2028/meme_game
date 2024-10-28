import {db} from "../db/db.mjs";
import {DescriptionInMeme, Meme} from "../components/Meme.mjs";

     export const getMultipleMemeDAO = ()=>{
        return new Promise((resolve, reject)=>{
        let memeArray;
        const sql = "select name_image from Meme order by random() limit 3";
            db.all(sql, (err,rows)=>{
                if(err) reject(err);
                memeArray = rows.map(row=>new Meme(row.name_image,[]));
                resolve(memeArray);
            })
        })
    }
     export const getCaptionRelatedToMeme = (meme)=>{
        return new Promise((resolve, reject)=>{
            let captionArray;
            const sql = "select description from Caption,Meme where ref_meme = id_meme and name_image = ?";
            db.all(sql,[meme],(err,rows)=>{
                if(err) reject(err);
                captionArray = rows.map(row=>new DescriptionInMeme(row.description,true));
                resolve(captionArray);
            })

        })
    }
     export const getRandomCaption =(meme)=>{
        return new Promise((resolve,reject)=>{
            const sql = "select description from Caption,Meme where ref_meme = id_meme and name_image != ? order by random() limit 5";
            let captionArray;
            db.all(sql,[meme],(err,rows)=>{
                if(err) reject(err);
                captionArray = rows.map(row=>new DescriptionInMeme(row.description,false));
                resolve(captionArray);
            })
        })
    }

    export const getSingleMemeDAO = ()=>{
         return new Promise((resolve,reject)=>{
             const sql = "select name_image from Meme order by random() limit 1";
             db.get(sql, (err,row)=>{
                 if(err) reject(err);
                 resolve(new Meme(row.name_image,[]));
             })
         })

    }

    export const getIdMeme = (meme)=>{
        return new Promise((resolve, reject)=>{
            const sql = "select id_meme from Meme where name_image = ?";
            db.get(sql,[meme],(err,row)=>{
                if(err)
                    reject(err)
                resolve(row.id_meme)
            })
        })
    }

