import { Pool } from "pg";

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.LOG_DATABASE
})

const connect = async () => {
    try {
        await pool.connect();
        console.log('Ok')
    } catch (exception) {
        console.log('Error')
    }
}

export default { pool, connect }