import {config} from 'dotenv';
config()
export const SETTINGS = {
    PORT: process.env.PORT || 3015,
    RouterPaths: {
        addresses: "/addresses",
        products: "/products",
        testingAllData: "/__test__/data"
    }
}