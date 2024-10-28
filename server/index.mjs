// imports
import express from 'express';
import loginrouter from './src/routes/LoginRoutes.mjs'
import morgan from "morgan";
import cors from 'cors';
import {initAuth} from "./src/auth.mjs";
import memeRoute from "./src/routes/MemeRoute.mjs";
import gameplayRoute from "./src/routes/GameplayRoute.mjs";
import profileRoute from "./src/routes/ProfileRoute.mjs";


// init express
const app = new express();
const port = 3006;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};


app.use(morgan("dev"))
app.use(express.json());
app.use(cors(corsOptions));





initAuth(app)
app.use("/session",loginrouter)
app.use("/meme",memeRoute)
app.use("/gameplay",gameplayRoute)
app.use("/profile",profileRoute)

app.use(express.static('public'))
app.use((err, req, res, next) => {
  if (err.customMessage && err.customCode) {
    res.status(err.customCode).json({ message: err.customMessage });
  } else {
    console.error('Error stack:', err.stack || err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});