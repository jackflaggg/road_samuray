import express from 'express';
const app = express();
const port = process.env.PORT || 8080;


app.get('/', (req, res) => {

})

app.listen(port, () => {
    console.log(`APP started on port: ${port}}`)
})