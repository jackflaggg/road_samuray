import express, {Request, Response} from 'express';
const app = express();
const port: string | number = process.env.PORT || 3015;


app.get('/', (req: Request, res: Response) => {
    let chunk = 'hello';
    res.send(chunk);
});

app.listen(port, () => {
    console.log(`APP started on port: ${port}`)
});