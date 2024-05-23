"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterPaths = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const addresses_router_1 = require("./routes/addresses-router");
exports.app = (0, express_1.default)();
exports.RouterPaths = {
    addresses: "/addresses",
    products: "/products",
    testingAllData: "/__test__/data'"
};
exports.app.use(express_1.default.json());
exports.app.use(exports.RouterPaths.addresses, addresses_router_1.addressesRouter);
// app.use(RouterPaths.products, productsRouter);
exports.app.delete(exports.RouterPaths.testingAllData, (req, res) => {
    db_1.db.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
