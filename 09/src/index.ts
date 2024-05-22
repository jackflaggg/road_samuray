import express, {Request, Response} from 'express';
import {dataAddresses, dataProducts, HTTP_STATUSES} from "./db";

const app = express();
const port: string | number = process.env.PORT || 3015;

app.get('/products', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(dataProducts);
});

app.get('/products/:id', (_req: Request, res: Response) => {

    res.status(HTTP_STATUSES.OK_200).send();
});

app.get('/addresses', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(dataAddresses);
});

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});