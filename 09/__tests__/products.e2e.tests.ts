import request from "supertest";
import {app} from "../src/app";
import {dataProducts, HTTP_STATUSES} from "../src/db";
import {RouterPaths} from "../src/app";
import {
    bodyGetStatusNotFound,
    correctIdProducts, inCorrectBodyIdProducts, inCorrectBodyTitleProducts,
    inCorrectIdProducts, updateEntityProducts
} from "./datatests";

const getRequest = () => request(app);

describe(RouterPaths.products, ()=> {

    beforeAll(async() => {
        await getRequest()
            .delete(RouterPaths.testingAllData)
    });

    it('+GET method: return code 200 and all data address',  async ()=> {
        await getRequest()
            .get(RouterPaths.products)
            .expect(HTTP_STATUSES.OK_200, dataProducts)
    });

    it('+GET method: correct id, and return code 200, and all data address',  async ()=> {
        await getRequest()
            .get(`${RouterPaths.products}/${correctIdProducts}`)
            .expect(HTTP_STATUSES.OK_200, dataProducts.find(p => p.id === correctIdProducts))
    });

    it('-GET method: incorrect id, and return code 200, and all data address',  async ()=> {
        await getRequest()
            .get(`${RouterPaths.products}/${inCorrectIdProducts}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404, bodyGetStatusNotFound);
    });

    it('+DELETE method: correct id, and return code 200',  async ()=> {
        await getRequest()
            .delete(`${RouterPaths.products}/${correctIdProducts}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-DELETE method: incorrect id, and return code 200',  async ()=> {
        await getRequest()
            .delete(`${RouterPaths.products}/${inCorrectIdProducts}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('+PUT method: correct id - uri params, correct body and return code 204', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.products}/${correctIdProducts}`)
            .send(updateEntityProducts)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
        //expect(response.status).toEqual(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-PUT method: incorrect id - uri params, correct body and return code 404', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.products}/${inCorrectIdProducts}`)
            .send(updateEntityProducts)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('-PUT method: correct id - uri params, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.products}/${correctIdProducts}`)
            .send(inCorrectBodyIdProducts)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('-PUT method: correct id - uri params, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .put(`${RouterPaths.products}/${correctIdProducts}`)
            .send(inCorrectBodyTitleProducts)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('+POST method, correct body and return code 201', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.products}`)
            .send(updateEntityProducts)
            .expect(HTTP_STATUSES.CREATED_201);
    });

    it('-POST method, incorrect body - id and return code 400', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.products}`)
            .send(inCorrectBodyIdProducts)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });

    it('-POST method, incorrect body - value and return code 400', async () => {
        const response = await getRequest()
            .post(`${RouterPaths.products}`)
            .send(inCorrectBodyTitleProducts)
            .expect(HTTP_STATUSES.BAD_REQUEST_400);
    });
})