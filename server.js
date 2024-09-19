import express from 'express';
import dotenv from 'dotenv';

import router from './src/routes/routes.js';

dotenv.config({ path: './src/config/app.env' });

const APP = express();
const PORT = process.env.PORT;

APP.use(router);
APP.listen(
    PORT,
    console.log(`Application started on port ${PORT}.`)
);