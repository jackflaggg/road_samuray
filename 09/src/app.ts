import express, {Request, Response} from "express";
import {db, HTTP_STATUSES} from "./db";
import {addressesRouter} from "./routes/addresses-router";
import {productsRouter} from "./routes/products-router";

export const app = express();
export const RouterPaths: {[key: string]: string} = {
    addresses: "/addresses",
    products: "/products",
    testingAllData: "/__test__/data'"
};

app.use(express.json());

app.use(RouterPaths.addresses, addressesRouter);
// app.use(RouterPaths.products, productsRouter);

app.delete(RouterPaths.testingAllData, (req: Request, res: Response) => {
    db.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})