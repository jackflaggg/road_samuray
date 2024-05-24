import express, {Express, Request, Response} from "express";
import cors from 'cors';
import {db, HTTP_STATUSES} from "./db";
import {addressesRouter} from "./routes/addresses-router";
import {productsRouter} from "./routes/products-router";
import {SETTINGS} from "./settings";

export const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.RouterPaths.addresses, addressesRouter);
app.use(SETTINGS.RouterPaths.products, productsRouter);

app.delete(SETTINGS.RouterPaths.testingAllData, (req: Request, res: Response) => {
    db.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})