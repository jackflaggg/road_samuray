import {describe} from "node:test";
import request from "supertest";
import {app} from "../src";
import {dataAddresses, HTTP_STATUSES} from "../src/db";

const getRequest = () => request(app);

describe('/addresses', ()=> {
    beforeAll(async() => {
        await getRequest()
            .delete('/__test__/data')
    })

    it('Should return code 200 and a data address',  async ()=> {
        await getRequest()
            .get('/addresses')
            .expect(HTTP_STATUSES.OK_200, dataAddresses)
    });

    it('Should return code 404 and a data address',  async ()=> {
        await getRequest()
            .get('/addresses')
            .expect(HTTP_STATUSES.NOT_FOUND_404, [])
    })

})