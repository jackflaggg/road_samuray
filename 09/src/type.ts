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
    message: string,
}

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}

