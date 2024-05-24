"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const type_1 = require("../type");
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get('/', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title;
        res.send(db_1.dataProducts.filter(product => product.title.includes(searchString)));
    }
    else {
        res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataProducts);
    }
});
exports.productsRouter.get('/:id', (req, res) => {
    const { id: idProduct } = req.params;
    const product = db_1.dataProducts.find(p => p.id === +idProduct);
    if (!product) {
        res.status(db_1.HTTP_STATUSES.NOT_FOUND_404).send(type_1.ErrorsFound);
        return;
    }
    res.status(db_1.HTTP_STATUSES.OK_200).send(product);
});
exports.productsRouter.post('/', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    let { title, id } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({ message: `Incorrect value, length = ${title.length.toString()}`, field: `value` });
    }
    if (!id || typeof id !== 'number') {
        errors.errorsMessages.push({ message: `Incorrect id`, field: `id` });
    }
    if (errors.errorsMessages.length) {
        res
            .status(db_1.HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }
    const newProduct = {
        title, id
    };
    db_1.dataProducts.push(newProduct);
    return res.status(db_1.HTTP_STATUSES.CREATED_201).send(newProduct);
});
exports.productsRouter.put('/:id', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    let { title, id } = req.body;
    let numberId = Number(id);
    if (Object.entries(req.body).length === 0) {
        //проверка на пустоту req
        res.sendStatus(db_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({ message: `Incorrect title, length = ${title.length.toString()}`, field: `value` });
    }
    if (!numberId || typeof numberId !== 'number') {
        errors.errorsMessages.push({ message: `Incorrect id`, field: `id` });
    }
    if (errors.errorsMessages.length) {
        res
            .status(db_1.HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }
    let idParams = +req.params.id;
    let entityProduct = db_1.dataProducts.find(a => a.id === idParams);
    if (entityProduct) {
        Object.assign(entityProduct, { title, id: numberId });
        return res
            .status(db_1.HTTP_STATUSES.NO_CONTENT_204)
            .send(entityProduct);
    }
    else {
        return res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.productsRouter.delete('/', (req, res) => {
    db_1.dataProducts.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.productsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const indexProduct = db_1.dataProducts.findIndex(index => index.id === +id);
    if (indexProduct === -1)
        res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    db_1.dataProducts.splice(indexProduct, 1);
    return res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
