import {db} from "../db/db.mjs";
import crypto from "crypto";
import * as cypto from "crypto";
import User from "../components/User.mjs";
import { UserNotFount} from "../errors/ServerError.mjs";
import {PersonalInfo} from "../components/PersonalInfo.mjs";
 export class UserDAO{

 getUser = async (username,password)=>{
    return new Promise((resolve,reject)=>{

        const sql = "SELECT * FROM Player WHERE username = ?";

        db.get(sql,[username],(err,row)=>{

            if(err){
                reject(err)
                return
            }
            if(!row){
                resolve(undefined)
                return;
            }

            const user = new User(row.username,row.name,row.surname)
            const salt = row.salt

            cypto.scrypt(password,salt,32,(err,hashedPassword)=>{

                if(err) reject(err)
                if(!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) resolve(false)

                resolve(user)
            })

        })
    })
}

getPersonalInfo = (user)=>{
     return new Promise((resolve, reject)=>{
         const sql = "select username,first_name,last_name,mail from Player where username = ?";
         db.get(sql,[user.username],(err,row)=>{
             if(err){
                 reject(err);
                 return;
             }
             if(!row){
                 throw new UserNotFount()
             }
             resolve(new PersonalInfo(row.username,row.first_name,row.last_name,row.mail,0,0))
         })
     })
}



}

