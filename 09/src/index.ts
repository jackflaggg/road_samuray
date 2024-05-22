import express from 'express';
const app = express();
const port: string | number = process.env.PORT || 3015;


app.get('/', (req, res) => {
    let chunk = 'hello';
    res.send(chunk);
});

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});