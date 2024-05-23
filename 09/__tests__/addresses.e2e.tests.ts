import {describe} from "node:test";
import request from "supertest";
import {app} from "../src";
import {dataAddresses, HTTP_STATUSES} from "../src/db";

describe('/addresses', ()=> {
    it('Should return code 200 and a data address',  async ()=> {
        await request(app)
            .get('/addresses')
            .expect(HTTP_STATUSES.OK_200, dataAddresses)
    });

    it('Should return code 404 and a data address',  async ()=> {
        await request(app)
            .get('/addresses')
            .expect(HTTP_STATUSES.NOT_FOUND_404, [])
    })

})