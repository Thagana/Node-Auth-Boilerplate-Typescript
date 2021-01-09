import { NextFunction, Request, response, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logging from '../utils/logging';

const NAMESPACE = 'Register';

const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        // logging
        logging.info(NAMESPACE, 'Register user');

        const { password, email, username } = request.body;
        const token = uuidv4();

        // Basic validation
        if (!password || !email || !username)
            return response.status(400).json({
                success: false,
                message: 'Fields missing'
            });
        return response.status(200).json({
            success: true,
            message: 'Successfully registered'
        });
    } catch (error) {
        logging.error(NAMESPACE, 'Register user error');
        return response.status(400).json({
            success: false,
            message: 'something went wrong'
        });
    }
};

const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        logging.info(NAMESPACE, 'Login user');
        return response.status(200).json({
            success: true,
            message: 'Successfully loggedin'
        });
    } catch (error) {
        logging.error(NAMESPACE, 'Login user error');
        return response.status(400).json({
            success: false,
            message: 'something went wrong'
        });
    }
};

export default { register, login };
