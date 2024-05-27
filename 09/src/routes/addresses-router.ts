import {Request, Response, Router} from "express";
import {dataAddresses, dataProducts, HTTP_STATUSES} from "../db";
import {
    Address, ErrorsFound,
    ErrorsType,
    RequestWithBody,
    RequestWithParams, RequestWithParamsAndBody,
    RequestWithQuery
} from "../type";
import {
    GetAddressesQueryModelValue
} from "../models/addressesModels/GetAddressesQueryModeValuel";
import {AddressesUpdateInputModel} from "../models/addressesModels/AddressesUpdateModel";
import {AddressesCreateInputModel} from "../models/addressesModels/AddressesCreateModel";
import {GetAddressesQueryModelId} from "../models/addressesModels/GetAddressesQueryModeId";
import {
    DeleteAddressesParamsModelId,
} from "../models/addressesModels/DeleteAddressesQueryModeId";
import {addressesRepository} from "../repositories/addresses-repository";

export const addressesRouter: Router = Router({});

addressesRouter.get('/', (req: RequestWithQuery<GetAddressesQueryModelValue>, res: Response<Address[]>) => {
    let {value : newValue} = req.query;
    addressesRepository.giveAllAddresses(newValue?.toString())
    res.status(HTTP_STATUSES.OK_200).send(dataAddresses);
});

addressesRouter.get('/:id', (req: RequestWithParams<GetAddressesQueryModelId>, res: Response<Address | string>) => {
    const {id : idAddress} = req.params;
    let oneAddresses = addressesRepository.giveOneAddresses(idAddress);

    if (!oneAddresses) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(ErrorsFound);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(oneAddresses);
});

addressesRouter.post('/', (req: RequestWithBody<AddressesCreateInputModel>, res: Response<ErrorsType | Address>) => {

    let {value, id} = req.body;

    if (addressesRepository.businesCheckError(value, id).errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(addressesRepository.businesCheckError(value, id));
        return;
    }

    const entityAddresses: Address = addressesRepository.createEnitityAdresses(value, id);
    return res.status(HTTP_STATUSES.CREATED_201).send(entityAddresses);

});

addressesRouter.put('/:id', (req: RequestWithParamsAndBody<GetAddressesQueryModelId, AddressesUpdateInputModel>, res: Response<ErrorsType | Address>) => {
    let {value, id} = addressesRepository.createBodyEntityAddresses(req.body.value, +req.body.id);

    if (Object.entries(req.body).length === 0){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (addressesRepository.businesCheckError(value, id).errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(addressesRepository.businesCheckError(value, id));
        return;
    }

    let addresses = addressesRepository.changeCharacterAddresses(req.params.id);
    if (addresses) {
        Object.assign(addresses, { value, id });
        return res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(addresses)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

});

addressesRouter.delete('/', (req: Request, res: Response) => {
    addressesRepository.deleteAllAddresses(dataAddresses);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

addressesRouter.delete('/:id', (req: RequestWithParams<DeleteAddressesParamsModelId>, res: Response) => {
    const { id } = req.params;
    const index = addressesRepository.giveOneAddresses(+id);
    console.log(index)
    if (!index) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    //dataAddresses.splice(index[0], 1);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

