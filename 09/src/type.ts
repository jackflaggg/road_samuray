import {Request} from "express";

export interface Product {
    title: string,
    id: number
}

export interface Address {
    value: string,
    id: number
}

export type ErrorsMessageType = {
    field: string,
    message: string
}

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}

export const ErrorsFound: string = 'Not Found';

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;

export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;
