const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const executeSqlWithType = async (sql, type) => {
    try {
        const result = await pool.query(sql);
        if (type === 'select') {
            return result.rows;
        } else if (type === 'insert' || type === 'update' || type === 'delete') {
            return result.rowCount;
        } else {
            throw new Error(`Invalid SQL type: ${type}`);
        }
    } catch (error) {
        throw new Error(`Error executing SQL command: ${error}`);
    }
};

const executeSql = async (sql) => {
    try {
        const result = await pool.query(sql);
        return result;
    } catch (error) {
        throw new Error(`Error executing SQL command: ${error}`);
    }
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    connect: () => pool.connect(),
    sql: executeSql,
    close: () => pool.end()
};