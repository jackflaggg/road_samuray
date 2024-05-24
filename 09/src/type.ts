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

export type RequestWithBody<B> = Request<unknown, unknown, B, unknown>;
