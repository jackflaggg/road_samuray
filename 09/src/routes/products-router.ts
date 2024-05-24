import {Request, Response, Router} from "express";
import {dataProducts, HTTP_STATUSES} from "../db";
import {
    ErrorsFound,
    ErrorsType,
    Product,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "../type";
import {ProductUpdateAndCreateInputModel} from "../models/productModels/ProductCreateModel";
import {ProductGetInputModel} from "../models/productModels/GetProductQueryModel";
import {ProductInputModelParams} from "../models/productModels/GetProductURIModel";

export const productsRouter = Router({});

productsRouter.get('/', (req: RequestWithQuery<ProductGetInputModel>,
                         res: Response<Product[]>) => {
    if (req.query.title) {
        const searchString = req.query.title;
        res.send(dataProducts.filter(product => product.title.includes(searchString)));
    } else {
        res.status(HTTP_STATUSES.OK_200).send(dataProducts);
    }
});

productsRouter.get('/:id', (req: RequestWithParams<ProductInputModelParams>,
                            res: Response<Product | string>) => {
    const {id : idProduct} = req.params;
    const product = dataProducts.find(p => p.id === +idProduct);

    if (!product) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(ErrorsFound);
        return;
    }

    res.status(HTTP_STATUSES.OK_200).send(product);
});

productsRouter.post('/', (req: RequestWithBody<ProductUpdateAndCreateInputModel>,
                          res: Response<Product | ErrorsType>) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let {title, id} = req.body;

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({message: `Incorrect value, length = ${title.length.toString()}`, field: `value`});
    }

    if (!id || typeof id !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    const newProduct: Product = {
        title, id
    }

    dataProducts.push(newProduct);
    return res.status(HTTP_STATUSES.CREATED_201).send(newProduct);

});

productsRouter.put('/:id', (req: RequestWithParamsAndBody<ProductInputModelParams, ProductUpdateAndCreateInputModel>,
                            res: Response<Product | ErrorsType>) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }
    let {title, id} = req.body;
    let numberId = Number(id);

    if (Object.entries(req.body).length === 0){
        //проверка на пустоту req
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({message: `Incorrect title, length = ${title.length.toString()}`, field: `value`});
    }

    if (!numberId || typeof numberId !== 'number') {
        errors.errorsMessages.push({message: `Incorrect id`, field: `id`});
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    let idParams = +req.params.id;
    let entityProduct = dataProducts.find(a => a.id === idParams);
    if (entityProduct) {
        Object.assign(entityProduct, {title, id: numberId});
        return res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(entityProduct)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

productsRouter.delete('/', (req: Request,
                            res: Response) => {
    dataProducts.length = 0;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

productsRouter.delete('/:id', (req: RequestWithParams<ProductInputModelParams>,
                               res: Response) => {
    const { id } = req.params;
    const indexProduct: number = dataProducts.findIndex(index => index.id === +id);
    if (indexProduct === -1) res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);

    dataProducts.splice(indexProduct, 1);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
