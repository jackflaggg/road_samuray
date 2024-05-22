import express, {Request, Response} from 'express';
import {dataAddresses, dataProducts, HTTP_STATUSES} from "./db";
import {Address, ErrorsType, Product} from "./type";

const app = express();
const port: string | number = process.env.PORT || 3015;
app.use(express.json());

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

app.post('/addresses', (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let {value, id} = req.body;

    if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
        errors.errorsMessages.push({message: `Incorrect value, length = ${value.length.toString()}`, field: `value`});
    }

    if (!id || typeof id !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    const newAdress: Address = {
        value,
        id
    }

    dataAddresses.push(newAdress);
    return res.status(HTTP_STATUSES.CREATED_201).send(newAdress);

});

app.post('/products', (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let {title, id} = req.body;

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({message: `Incorrect value, length = ${title.length.toString()}`, field: `value`});
    }

    if (!id || typeof id !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    const newProduct: Product = {
        title, id
    }

    dataProducts.push(newProduct);
    return res.status(HTTP_STATUSES.CREATED_201).send(newProduct);

});

app.put('/products/:id', (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }
    let {title, id} = req.body;
    let numberId = Number(id);

    if (Object.entries(req.body).length === 0){
        //проверка на пустоту req
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({message: `Incorrect title, length = ${title.length.toString()}`, field: `value`});
    }

    if (!numberId || typeof numberId !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    let idParams = +req.params.id;
    let entityProduct = dataProducts.find(a => a.id === idParams);
    if (entityProduct) {
        entityProduct.title = title;
        entityProduct.id = numberId;
        return res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(entityProduct)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})

app.put('/addresses/:id', (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }
    let {value, id} = req.body;
    let numberId = Number(id);

    if (Object.entries(req.body).length === 0){
        //проверка на пустоту req
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
        errors.errorsMessages.push({message: `Incorrect value, length = ${value.length.toString()}`, field: `value`});
    }

    if (!numberId || typeof numberId !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    let idParams = +req.params.id;
    let entityAdresses = dataAddresses.find(a => a.id === idParams);
    if (entityAdresses) {
        entityAdresses.value = value;
        entityAdresses.id = numberId;
        return res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(entityAdresses)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})

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