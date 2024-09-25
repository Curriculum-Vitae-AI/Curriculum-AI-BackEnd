import pg from 'pg';
import dotenv from 'dotenv';
import { Logger } from '../utils/log/logger.js';

dotenv.config({ path: './src/config/app.env' });

const pool = new pg.Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.LOG_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DATABASE_CERTIFICATE
    }
})

const connect = async function() {
    try {
        await pool.connect();
        Logger.app('Conectado ao banco de dados com sucesso.')
    } catch (exception) {
        Logger.error('connect', exception)
        throw exception;
    }
}

export default { pool, connect };