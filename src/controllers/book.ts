import { NextFunction, Request, response, Response } from 'express';
import logging from '../utils/logging';

const NAMESPACE = 'Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');
    return response.status(200).json({
        success: true,
        message: 'request successfull'
    });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');
    return response.status(200).json({
        success: true,
        message: 'request successfull'
    });
};

export default { createBook, getAllBooks };
