import {app} from "./app";

const port: string | number = process.env.PORT || 3015;

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});