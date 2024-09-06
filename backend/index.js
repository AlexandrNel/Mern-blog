import express from "express";
import { authRouter } from "./routes/auth.js";
import { connectToDatebase } from "./database/connect.js";

const PORT = 3000;
const app = express();
connectToDatebase();

app.use(express.json(), authRouter);

app.listen(PORT, (err) => (err ? console.log(err) : console.log("Server OK")));
