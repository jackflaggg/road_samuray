import {Address, ErrorsType, Product} from "./type";

export const dataProducts: Product[] = [{title: 'tomato', id: 0}, {title: 'apple', id: 1}];
export const dataAddresses: Address[] = [{value: 'Lenina 30', id: 0}, {value: 'Artema 128', id: 1}];

export let db = [dataProducts, dataAddresses];

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

const errors: ErrorsType = {
    errorsMessages: []
}