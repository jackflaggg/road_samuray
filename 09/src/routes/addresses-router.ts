import {Request, Response, Router} from "express";
import {dataAddresses, dataProducts, HTTP_STATUSES} from "../db";
import {Address, ErrorsType, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../type";
import {GetAddressesQueryModel} from "../models/addressesModels/GetAddressesQueryModel";
import {AddressesInputModelParams} from "../models/addressesModels/AddressesUpdateModel";

export const addressesRouter = Router({});

addressesRouter.get('/', (req: RequestWithQuery<GetAddressesQueryModel>, res: Response) => {
    let {value : newValue} = req.query;
    if (newValue){
        res.send(dataAddresses.filter(a => a.value.includes(newValue)));
    }
    res.status(HTTP_STATUSES.OK_200).send(dataAddresses);
});

addressesRouter.get('/:id', (req: RequestWithParams<AddressesInputModelParams>, res: Response<Address | string>) => {
    const {id : idAddress} = req.params;
    const address = dataAddresses.find(a => a.id === +idAddress);

    if (!address) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found');
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(address);
});

addressesRouter.post('/', (req: Request, res: Response) => {
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

addressesRouter.put('/:id', (req: Request, res: Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let {value, id} = req.body;
    let numberId = Number(id);
    if (Object.entries(req.body).length === 0){
        //проверка на пустоту запроса!
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
        errors.errorsMessages.push({message: `Incorrect value, length = ${value.length.toString()}`, field: `value`});
    }

    // dataAddresses.findIndex((elem) => elem.id === +req.params.id) === -1 - проверка на req.params!

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
        Object.assign(entityAdresses, { value, id: numberId });
        console.log(entityAdresses)
        return res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(entityAdresses)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

});

addressesRouter.delete('/', (req: Request, res: Response) => {
    dataAddresses.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

addressesRouter.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = dataProducts.findIndex(product => product.id === +id);

    if (index === -1) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    dataAddresses.splice(index, 1);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

