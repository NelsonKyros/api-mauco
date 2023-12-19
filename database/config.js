const mysql = require('mysql2/promise');

const dbConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_CNNR,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_BDDR,
            port: process.env.DB_PORT,
        });

        console.log('Database conexión establecida');

        return connection;
    } catch (error) {
        console.error('Error establecer conexion con Database:', error);
        throw error;
    }
};

module.exports = {
    dbConnection
};
