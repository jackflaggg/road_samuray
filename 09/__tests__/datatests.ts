import {ErrorsType} from "../src/type";

export let correctIdAddresses: number = 0;
export let inCorrectIdAddresses: number = 9999;

export let correctIdProducts: number = 0;
export let inCorrectIdProducts: number = 545

export const updateEntityAdress: {value: string, id: number} = {value: 'Test ulica!', id: 5};
export const updateEntityProducts: {title: string, id: number} = {title: 'Test', id: 3};
export const bodyGetStatusNotFound = 'Not Found';

export const errorsTestIdBody: ErrorsType = {
    errorsMessages: [{message: `Incorrect id`, field: `id`}]
}

export const errorsTestValueBody: ErrorsType = {
    errorsMessages: [{message: `Incorrect value`, field: `value`}]
}

export const inCorrectBodyIdAddresses= {value: 'Test ulica!', id: 'test'};
export const inCorrectBodyValueAddresses= {value: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', id: 4};

export const inCorrectBodyIdProducts= {title: 'Test!', id: 'test'};
export const inCorrectBodyTitleProducts= {title: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', id: 4};