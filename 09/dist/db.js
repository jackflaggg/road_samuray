"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.db = exports.dataAddresses = exports.dataProducts = void 0;
exports.dataProducts = [{ title: 'tomato', id: 0 }, { title: 'apple', id: 1 }];
exports.dataAddresses = [{ value: 'Lenina 30', id: 0 }, { value: 'Artema 128', id: 1 }];
exports.db = [exports.dataProducts, exports.dataAddresses];
var HTTP_STATUSES;
(function (HTTP_STATUSES) {
    HTTP_STATUSES[HTTP_STATUSES["OK_200"] = 200] = "OK_200";
    HTTP_STATUSES[HTTP_STATUSES["CREATED_201"] = 201] = "CREATED_201";
    HTTP_STATUSES[HTTP_STATUSES["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    HTTP_STATUSES[HTTP_STATUSES["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
    HTTP_STATUSES[HTTP_STATUSES["NOT_FOUND_404"] = 404] = "NOT_FOUND_404";
    HTTP_STATUSES[HTTP_STATUSES["INTERNAL_SERVER_ERROR_500"] = 500] = "INTERNAL_SERVER_ERROR_500";
})(HTTP_STATUSES || (exports.HTTP_STATUSES = HTTP_STATUSES = {}));
const errors = {
    errorsMessages: []
};
