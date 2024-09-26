import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import Logger from '../core/utils/log/Logger.js';

dotenv.config({ path: './src/config/app.env' });

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.DATABASE_CERTIFICATE
        }
    }
});

const connect = async function() {
    try {
        await sequelize.sync();
        Logger.app('Banco de dados sincronizado com sucesso.');
    } catch (exception) {
        Logger.error('connect', exception);
        throw exception;
    }
};

export default { sequelize, connect };
