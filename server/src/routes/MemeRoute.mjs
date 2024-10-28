// Creating express Router
import {validatorRequestError} from "../errors/ErrorHandler.mjs";
import {getMemes, getSingleMeme} from "../controllers/MemeController.mjs";
import express from "express";
export const router=express.Router()

//L'utente deve essere loggato
router.get("/", (req,res,next) => getMemes().then(r => res.status(200).json(r)).catch((err)=>next(err))
);
//l'utente non è loggato, prendo un singolo meme
router.get("/single",
    (req,res) => getSingleMeme().then(r => res.status(200).json(r)).catch((err)=>next(err))
);

//l'utente posta un singolo meme: route loggata


export default router