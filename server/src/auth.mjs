import passport from 'passport';
import LocalStrategy from 'passport-local';
import {UserDAO} from "./dao/UserDAO.mjs";
import session from "express-session";


    export const initAuth = (app)=>{
        app.use(session({
        // set up here express-session
            secret: "a secret phrase of your choice", resave: false,
            saveUninitialized: false,
        }));
        passport.use(new LocalStrategy( async function verify (username, password, callback) {
            let dao = new UserDAO()
            dao.getUser(username,
                password).then((user) => {
                if (!user){
                    return callback(null, false, {message:'Incorrect username and/or password.'} );
                }
                return callback(null, user);
                } );
        }));

        passport.serializeUser((user, cb) => {
            cb(null, {id: user.id, username: user.username, name: user.name});
        });

        passport.deserializeUser((user, cb) => {
            return cb(null, user);
        });

        app.use(passport.initialize());

        app.use(passport.session());
    }


    export const isLoggedIn = (req,res,next) =>{
        if(req.isAuthenticated())
            return next();
        return res.status(400).json({message : "not authenticated"});
    }









