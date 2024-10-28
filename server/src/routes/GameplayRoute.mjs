import express from "express";
import {isLoggedIn} from "../auth.mjs";
import {
    createGameplay, deleteGameplay,
    endCurrentGame,
    getHistory,
    getIdGamplay, getRoundsOfCurrentGamePlay,
    registerAllrounds
} from "../controllers/GameplayController.mjs";
import {getIDCurrentGameplay} from "../dao/GameplayDao.mjs";
import {body, check} from "express-validator";
import {validatorRequestError} from "../errors/ErrorHandler.mjs";

export const router=express.Router()
router.post("/allRounds",
    body("rounds").notEmpty(),
    body('rounds.*.meme').notEmpty().isString(),
    body('rounds.*.round_number').isInt({ min: 1 }),
    validatorRequestError,
    isLoggedIn,
    (req,res,next)=> registerAllrounds(req.user,req.body).then(r => res.status(200).json(r)).catch((err)=>next(err))
);
router.post(
    "/",
    isLoggedIn,
    (req,res,next)=> createGameplay(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err))
);
router.delete(
    "/",
    isLoggedIn,
    (req,res,next)=> deleteGameplay(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err))
);
router.get(
    "/current",
    isLoggedIn,
    (req,res,next)=> getIdGamplay(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err))
);
router.get(
    "/current/rounds",
    isLoggedIn,
    (req,res,next)=> getRoundsOfCurrentGamePlay(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err))
);
router.get(
    "/history",
    isLoggedIn,
    (req,res,next)=> getHistory(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err))
);

router.put(
    '/end',
    isLoggedIn,
    (req,res,next)=>endCurrentGame(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err)));

export default router