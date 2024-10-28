import {body, query} from "express-validator";
import {validatorRequestError} from "../errors/ErrorHandler.mjs";
import express, {json} from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {isLoggedIn} from "../auth.mjs";

// Creating express Router
export const router=express.Router()


router.post("/login",
    body("username").notEmpty().isString(),
    body("password").notEmpty().isLength({max:20}).isAlphanumeric(),
    validatorRequestError,
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err)
                return next(err);
            if (!user)
                return res.status(401).json({ message: info.message });
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.json({ username: req.user.username });
            });
        })(req, res, next);
    }
);

router.delete("/logout",
    isLoggedIn,
    (req,res) => req.logout(
        ()=>{
            res.send();
        }
    )
);
export default router;