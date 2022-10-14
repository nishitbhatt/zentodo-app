import bodyParser from "body-parser"
import express from "express"
import dotenv from "dotenv"
import './connection'

const app = express();
const router = express.Router()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

app.disable('etag');

export {
    app,
    router
}