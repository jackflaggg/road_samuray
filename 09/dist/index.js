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
    res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataProducts);
});
app.get('/addresses', (req, res) => {
    res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataAddresses);
});
app.get('/products/:id', (req, res) => {
    const idProduct = Number(req.params.id);
    const product = db_1.dataProducts.find(p => p.id === idProduct);
    if (!product) {
        res.status(db_1.HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }
    res.status(db_1.HTTP_STATUSES.OK_200).send(product);
});
app.listen(port, () => {
    console.log(`APP started on port: ${port}`);
});
