"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3015;
app_1.app.listen(port, () => {
    console.log(`APP started on port: ${port}`);
});
