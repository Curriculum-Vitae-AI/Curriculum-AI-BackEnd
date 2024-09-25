import express from 'express';
import dotenv from 'dotenv';
import { Logger } from './src/utils/log/logger.js';

import router from './src/routes/routes.js';
import db from './src/config/database.js';

dotenv.config({ path: './src/config/app.env' });

const appInit = async () => {
    
    await db.connect();
    
    const APP = express();
    const PORT = process.env.PORT;

    APP.use(router);
    APP.listen(
        PORT,
        Logger.app(`Aplicação iniciada com sucesso na porta: ${PORT}`)
    );
}

appInit();