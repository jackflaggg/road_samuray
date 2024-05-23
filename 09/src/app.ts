import express, {Request, Response} from "express";
import {db, HTTP_STATUSES} from "./db";

export const app = express();

app.use(express.json());

app.delete('/__test__/data', (req: Request, res: Response) => {
    db.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})