import { NextFunction, Request, Response } from 'express';
import logging from '../utils/logging';

const NAMESPACE = 'Home';

const index = async (request: Request, response: Response, next: NextFunction) => {
    try {
        logging.info(NAMESPACE, 'Inserting books');
        return response.status(200).json({
            success: true,
            message: 'request successfull'
        });
    } catch (error) {
        logging.error(NAMESPACE, 'Index route error', error);
        return response.status(200).json({
            success: true,
            message: 'request successfull'
        });
    }
};

export default index;
