import {Address, ErrorsType} from "../type";
import {dataProducts} from "../db";

const dataAddresses: Address[] = [{value: 'Lenina 30', id: 0}, {value: 'Artema 128', id: 1}];

export const addressesRepository = {
    giveAllAddresses(value: string): Address[] {
        if (value){
            return dataAddresses.filter(a => a.value.includes(value));
        } else {
            return dataAddresses;
        }
    },

    giveOneAddresses(id: string | number)  {
        return dataAddresses.find(a => a.id === +id);
    },

    businesCheckError(value: string, id: number) : ErrorsType {
        const errors: ErrorsType = {
            errorsMessages: []
        }

        if (!value || typeof value !== 'string' || !value.trim() || value.length > 40) {
            errors.errorsMessages.push({message: `Incorrect value, length = ${value.length.toString()}`, field: `value`});
        }

        if (!id || typeof id !== 'number') {
            errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
        }

        return errors;
    },
    createEnitityAdresses(value: string, id: number): Address {
        const newAdress: Address = {
            value,
            id
        }
        dataAddresses.push(newAdress);
        return newAdress;
    },
    createBodyEntityAddresses(value: string, id: number): Address {
        return {
            value,
            id
        }
    },

    changeCharacterAddresses(idParamsURI: string | number) {
        let idParams = +idParamsURI;
        return dataAddresses.find(a => a.id === idParamsURI);
    },

    deleteAllAddresses(dataAddresses: Address[]) {
        return dataAddresses.length = 0;
    },
}