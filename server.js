import express from 'express';
import dotenv from 'dotenv';

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
        console.log(`Application started on port ${PORT}.`)
    );
}

appInit();