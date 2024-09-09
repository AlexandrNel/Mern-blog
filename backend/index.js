import express from "express";

import { authRouter, postRouter, uploadRouter } from "./routes/index.js";
import { connectToDatebase } from "./database/connect.js";

const PORT = 3000;
const app = express();

connectToDatebase();

app.use(express.json(), uploadRouter, authRouter, postRouter);

app.listen(PORT, (err) => (err ? console.log(err) : console.log("Server OK")));
