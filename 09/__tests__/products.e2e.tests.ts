import request from "supertest";
import {app} from "../src/app";
import {dataProducts, HTTP_STATUSES} from "../src/db";
import {RouterPaths} from "../src/app";
import {bodyGetStatusNotFound, correctIdProducts, inCorrectIdProducts} from "./datatests";

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
})