import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Logger from './src/core/utils/log/Logger.js';
import roadMapRouter from './src/routes/roadmap/RoadMapRouter.js';
import motivationLetterRouter from './src/routes/motivation-letter/MotivationLetterRouter.js';
import vacancyRouter from './src/routes/vacancy/VacancyRouter.js';
import db from './src/config/DataBaseConfig.js';

dotenv.config({ path: './src/config/app.env' });

const appInit = async () => {

    await db.connect();

    const PORT = process.env.APP_PORT;
    const API = process.env.API_NAME;
    const VERSION = process.env.CONTROL_VERSION;
    const CORS = process.env.CORS;
    const APP = express();

    APP.use(cors({
        origin: CORS
    }));

    APP.use(express.json());
    APP.use(`/${API}/${VERSION}/roadmap`, roadMapRouter);
    APP.use(`/${API}/${VERSION}/motivation-letter`, motivationLetterRouter);
    APP.use(`/${API}/${VERSION}/vacancy`, vacancyRouter);
    APP.listen(
        PORT,
        Logger.app(`Aplicação iniciada com sucesso na porta: ${PORT}`));
};

appInit();
