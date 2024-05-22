import express, {Request, Response} from 'express';
import {dataAddresses, dataProducts, HTTP_STATUSES} from "./db";

const app = express();
const port: string | number = process.env.PORT || 3015;

app.get('/products', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(dataProducts);
});

app.get('/addresses', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(dataAddresses);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const idProduct = Number(req.params.id);
    const product = dataProducts.find(p => p.id === idProduct);

    if (!product) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(product);
});

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});