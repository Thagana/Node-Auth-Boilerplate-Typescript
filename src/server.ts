import http from 'http';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bookRoutes from './routes/book';

// utils
import logging from './utils/logging';
dotenv.config();

const NAMESPACE = 'Server';

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);

    res.on('finish', () => {
        /** Log the res */
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    });

    next();
});

const server = app.listen(PORT, () => logging.info(NAMESPACE, `Server is running ${PORT}`));
