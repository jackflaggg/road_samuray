import request from "supertest";
import {app} from "../src/app";
import {dataProducts, HTTP_STATUSES} from "../src/db";
import {RouterPaths} from "../src/app";

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
})