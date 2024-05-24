"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const addresses_router_1 = require("./routes/addresses-router");
const products_router_1 = require("./routes/products-router");
const settings_1 = require("./settings");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(settings_1.SETTINGS.RouterPaths.addresses, addresses_router_1.addressesRouter);
exports.app.use(settings_1.SETTINGS.RouterPaths.products, products_router_1.productsRouter);
exports.app.delete(settings_1.SETTINGS.RouterPaths.testingAllData, (req, res) => {
    db_1.db.length = 0;
    res.sendStatus(db_1.HTTP_STATUSES.NO_CONTENT_204);
});
