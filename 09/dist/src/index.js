"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3015;
app.get('/products', (req, res) => {
    res.status(200).send(db_1.dataProducts);
});
app.get('/products/:id', (_req, res) => {
    res.send();
});
app.get('/addresses', (req, res) => {
    res.status(200).send(db_1.dataAddresses);
});
app.listen(port, () => {
    console.log(`APP started on port: ${port}`);
});
