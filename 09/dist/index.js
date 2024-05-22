"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3015;
app.get('/products', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        res.send(db_1.dataProducts.filter(product => product.title.includes(searchString)));
    }
    else {
        res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataProducts);
    }
});
app.get('/addresses', (req, res) => {
    res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataAddresses);
});
app.get('/products/:id', (req, res) => {
    const { id: idProduct } = req.params;
    const product = db_1.dataProducts.find(p => p.id === +idProduct);
    if (!product) {
        res.status(db_1.HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }
    res.status(db_1.HTTP_STATUSES.OK_200).send(product);
});
app.get('/addresses/:id', (req, res) => {
    const { id: idAdress } = req.params;
    const address = db_1.dataAddresses.find(a => a.id === +idAdress);
    if (!address) {
        res.status(db_1.HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }
    res.status(db_1.HTTP_STATUSES.OK_200).send(address);
});
app.delete('/addresses', (req, res) => {
    db_1.dataAddresses.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
app.delete('/products', (req, res) => {
    db_1.dataProducts.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
app.delete('/addresses/:id', (req, res) => {
    const { id } = req.params;
    const index = db_1.dataProducts.findIndex(product => product.id === +id);
    if (index === -1)
        res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    db_1.dataAddresses.splice(index, 1);
    return res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
});
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = db_1.dataProducts.findIndex(index => index.id === +id);
    if (index === -1)
        res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    db_1.dataProducts.splice(index, 1);
    return res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
});
app.listen(port, () => {
    console.log(`APP started on port: ${port}`);
});
