import express from "express";
import {isLoggedIn} from "../auth.mjs";
import {getPersonalInfo} from "../controllers/ProfileController.mjs";

export const router=express.Router()


router.get("/",isLoggedIn, (req,res,next)=>getPersonalInfo(req.user).then(r => res.status(200).json(r)).catch((err)=>next(err)))

export default router;