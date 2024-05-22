"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3015;
const dataProducts = [{ title: 'tomato' }, { title: 'apple' }];
const dataAddresses = [{ value: 'Lenina 30' }, { value: 'Artema 128' }];
app.get('/products', (req, res) => {
    res.send(dataProducts);
});
app.get('/products/:id', (req, res) => {
    let chunk = dataProducts.find(product => product.title === 'apple');
    res.send(chunk);
});
app.get('/addresses', (req, res) => {
    res.send(dataAddresses);
});
app.listen(port, () => {
    console.log(`APP started on port: ${port}`);
});
