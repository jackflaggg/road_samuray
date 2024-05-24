import {ErrorsType} from "../src/type";

export let correctIdAddresses: number = 0;
export let inCorrectIdAddresses: number = 9999;

export let correctIdProducts: number = 0;
export let inCorrectIdProducts: number = 545

export const updateEntityAdress: {value: string, id: number} = {value: 'Test ulica!', id: 5};

export const bodyGetStatusNotFound = 'Not Found';

export const errorsTestIdBody: ErrorsType = {
    errorsMessages: [{message: `Incorrect id`, field: `id`}]
}

export const errorsTestValueBody: ErrorsType = {
    errorsMessages: [{message: `Incorrect value`, field: `value`}]
}

export const inCorrectBodyId= {value: 'Test ulica!', id: 'str'};

export const inCorrectBodyValue= {value: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', id: 'str'};