import express from 'express';
import dotenv from 'dotenv';

import Logger from './src/core/utils/log/Logger.js';
import roadMapRouter from './src/routes/roadmap/RoadMapRouter.js';
import db from './src/config/DataBaseConfig.js';

dotenv.config({ path: './src/config/app.env' });

const appInit = async () => {

    await db.connect();

    const PORT = process.env.APP_PORT;
    const API = process.env.API_NAME;
    const VERSION = process.env.CONTROL_VERSION;
    const APP = express();

    APP.use(express.json());
    APP.use(`/${API}/${VERSION}/roadmap`, roadMapRouter);
    APP.listen(
        PORT,
        Logger.app(`Aplicação iniciada com sucesso na porta: ${PORT}`));
};

appInit();
