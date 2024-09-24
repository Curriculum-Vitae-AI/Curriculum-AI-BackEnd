import pg from 'pg';
import dotenv from 'dotenv';

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
        console.log('Connected sucessfully')
    } catch (exception) {
        console.log(exception)
    }
}

export default { pool, connect };