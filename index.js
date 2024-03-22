import express from "express";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import bodyParser from "body-parser";
import cors from "cors";
import config from "config";
import { error } from "./middleware/error.js";

const app = express();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
};

Connection();

app.use(error());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));