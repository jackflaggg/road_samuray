import request from "supertest";
import {app} from "../src/app";
import {dataAddresses, HTTP_STATUSES} from "../src/db";
import {RouterPaths} from "../src/app";
import {
    bodyGetStatusNotFound,
    correctIdAddresses, inCorrectBodyIdAddresses, inCorrectBodyValueAddresses,
    inCorrectIdAddresses,
    updateEntityAdress
} from "./datatests";

const getRequest = () => request(app);

describe(RouterPaths.addresses, ()=> {

    beforeAll(async() => {
        const response = await getRequest()
            .delete(RouterPaths.testingAllData)
    });

    it('+GET method: return code 200 and all data address',  async ()=> {
        const response = await getRequest()
            .get(RouterPaths.addresses)
            .expect(HTTP_STATUSES.OK_200, dataAddresses);
    });

    it('+GET method: correct id, and return code 200, and all data address',  async ()=> {
        const response = await getRequest()
            .get(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .expect(HTTP_STATUSES.OK_200, dataAddresses.find(a => a.id === correctIdAddresses));
    });

    it('-GET method: incorrect id, and return code 404, and all data address',  async ()=> {
        const response = await getRequest()
            .get(`${RouterPaths.addresses}/${inCorrectIdAddresses}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404, bodyGetStatusNotFound);
    });

    it('+DELETE method: correct id, and return code 204',  async ()=> {
        const response = await getRequest()
            .delete(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-DELETE method: incorrect id, and return code 404',  async ()=> {
        const response = await getRequest()
            .delete(`${RouterPaths.addresses}/${inCorrectIdAddresses}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('+PUT method: correct id - uri params, correct body and return code 204', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .send(updateEntityAdress);
        expect(response.status).toEqual(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-PUT method: incorrect id - uri params, correct body and return code 404', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.addresses}/${inCorrectIdAddresses}`)
            .send(updateEntityAdress)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('-PUT method: correct id - uri params, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .send(inCorrectBodyIdAddresses)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('-PUT method: correct id - uri params, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.addresses}/${correctIdAddresses}`)
            .send(inCorrectBodyValueAddresses)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('+POST method, correct body and return code 201', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.addresses}`)
            .send(updateEntityAdress)
            .expect(HTTP_STATUSES.CREATED_201);
    });

    it('-POST method, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.addresses}`)
            .send(inCorrectBodyIdAddresses)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('-POST method, incorrect body - value and return code 400', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.addresses}`)
            .send(inCorrectBodyValueAddresses)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });
})