"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.addressesRouter = (0, express_1.Router)({});
exports.addressesRouter.get('/', (req, res) => {
    res.status(db_1.HTTP_STATUSES.OK_200).send(db_1.dataAddresses);
});
exports.addressesRouter.get('/:id', (req, res) => {
    const { id: idAdress } = req.params;
    const address = db_1.dataAddresses.find(a => a.id === +idAdress);
    if (!address) {
        res.status(db_1.HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }
    res.status(db_1.HTTP_STATUSES.OK_200).send(address);
});
exports.addressesRouter.post('/', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    let { value, id } = req.body;
    if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
        errors.errorsMessages.push({ message: `Incorrect value, length = ${value.length.toString()}`, field: `value` });
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
    const newAdress = {
        value,
        id
    };
    db_1.dataAddresses.push(newAdress);
    return res.status(db_1.HTTP_STATUSES.CREATED_201).send(newAdress);
});
exports.addressesRouter.put('/:id', (req, res) => {
    const errors = {
        errorsMessages: []
    };
    let { value, id } = req.body;
    let numberId = Number(id);
    if (Object.entries(req.body).length === 0) {
        //проверка на пустоту запроса!
        res.sendStatus(db_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
        errors.errorsMessages.push({ message: `Incorrect value, length = ${value.length.toString()}`, field: `value` });
    }
    // dataAddresses.findIndex((elem) => elem.id === +req.params.id) === -1 - проверка на req.params!
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
    let entityAdresses = db_1.dataAddresses.find(a => a.id === idParams);
    if (entityAdresses) {
        Object.assign(entityAdresses, { value, id: numberId });
        return res
            .status(db_1.HTTP_STATUSES.NO_CONTENT_204)
            .send(entityAdresses);
    }
    else {
        return res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.addressesRouter.delete('/addresses', (req, res) => {
    db_1.dataAddresses.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.addressesRouter.delete('/addresses/:id', (req, res) => {
    const { id } = req.params;
    const index = db_1.dataProducts.findIndex(product => product.id === +id);
    if (index === -1)
        res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
    db_1.dataAddresses.splice(index, 1);
    return res.sendStatus(db_1.HTTP_STATUSES.NOT_FOUND_404);
});
