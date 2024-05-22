import express, {Request, Response} from 'express';
import {dataAddresses, dataProducts, HTTP_STATUSES} from "./db";

const app = express();
const port: string | number = process.env.PORT || 3015;

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        res.send(dataProducts.filter(product => product.title.includes(searchString)));
    } else {
        res.status(HTTP_STATUSES.OK_200).send(dataProducts);
    }
});

app.get('/addresses', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(dataAddresses);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const {id : idProduct} = req.params;
    const product = dataProducts.find(p => p.id === +idProduct);

    if (!product) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(product);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
    const {id : idAdress} = req.params;
    const address = dataAddresses.find(a => a.id === +idAdress);

    if (!address) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(address);
});

app.delete('/addresses', (req: Request, res: Response) => {
    dataAddresses.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.delete('/products', (req: Request, res: Response) => {
    dataProducts.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.delete('/addresses/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = dataProducts.findIndex(product => product.id === +id);

    if (index === -1) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    dataAddresses.splice(index, 1);
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.delete('/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = dataProducts.findIndex(index => index.id === +id);
    if (index === -1) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    dataProducts.splice(index, 1);
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});