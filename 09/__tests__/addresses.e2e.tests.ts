import request from "supertest";
import {app} from "../src/app";
import {dataAddresses, HTTP_STATUSES} from "../src/db";
import {RouterPaths} from "../src/app";
import {bodyGetStatusNotFound, correctIdAddresses, inCorrectIdAddresses} from "./datatests";

const getRequest = () => request(app);

describe(RouterPaths.addresses, ()=> {

    beforeAll(async() => {
        await getRequest()
            .delete(RouterPaths.testingAllData)
    });

    it('+GET method: return code 200 and all data address',  async ()=> {
        await getRequest()
            .get(RouterPaths.addresses)
            .expect(HTTP_STATUSES.OK_200, dataAddresses)
    });

    it('+GET method: correct id, and return code 200, and all data address',  async ()=> {
        await getRequest()
            .get(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .expect(HTTP_STATUSES.OK_200, dataAddresses.find(a => a.id === correctIdAddresses))
    });

    it('-GET method: incorrect id, and return code 200, and all data address',  async ()=> {
        await getRequest()
            .get(`${RouterPaths.addresses}/${inCorrectIdAddresses}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404, bodyGetStatusNotFound);
    });

})