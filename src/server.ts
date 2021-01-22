import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { dbConfig } from './models';

// Routes
import bookRoutes from './routes/book';
import authRoutes from './routes/auth';
// utils
import logging from './utils/logging';

dotenv.config();

const NAMESPACE = 'Server';
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

dbConfig
    .authenticate()
    .then(() => console.log('connected to db'))
    .catch((error) => {
        console.log(error);
    });

app.use(helmet());
app.use(cors());
app.use(express.json());

/** Log the requestuest */
app.use((request, response, next) => {
    /** Log the request */
    logging.info(`METHOD: [${request.method}] - URL: [${request.url}] - IP: [${request.socket.remoteAddress}]`, NAMESPACE);

    response.on('finish', () => {
        /** Log the response */
        logging.info(`METHOD: [${request.method}] - URL: [${request.url}] - STATUS: [${response.statusCode}] - IP: [${request.socket.remoteAddress}]`, NAMESPACE);
    });

    next();
});

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (request.method == 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }

    next();
});

app.use('/books', bookRoutes);
app.use('/', authRoutes);

const server = app.listen(PORT, () => logging.info(NAMESPACE, `Server is running ${PORT}`));
