import express, {Request, Response} from 'express';

const app = express();
const port: string | number = process.env.PORT || 3015;

const dataProducts = [{title: 'tomato'}, {title: 'apple'}];
const dataAddresses = [{value: 'Lenina 30'}, {value: 'Artema 128'}]

app.get('/products', (req: Request, res: Response) => {
    res.send(dataProducts);
});

app.get('/products/:id', (req: Request, res: Response) => {
    let chunk = dataProducts.find(product => product.title === 'apple');
    res.send(chunk);
});

app.get('/addresses', (req: Request, res: Response) => {
    res.send(dataAddresses);
});
app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});