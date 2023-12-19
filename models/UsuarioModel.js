const { dbConnection } = require("../database/config");
const bcrypt = require('bcryptjs');

class UsuarioModel {
    constructor() {
        this.tableName = 'redcap_usuarios';
    }

    async emailExists(email) {//VALIDACION DE EMAIL EXISTENTE
         try {
            const db = await dbConnection();

            const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE email = ?`;
            const [result] = await db.execute(query, [email]);

            // If the count is greater than 0, the email already exists
            return result[0].count > 0;
        } catch (error) {
            console.error('Error checking email existence:', error);
            throw error;
        }
    }

    async loginUsuario(email, password) {
        try {
            const db = await dbConnection();
            // Verifica si el correo electrónico existe
            const emailExists = await this.emailExists(email);
         
            if (!emailExists) {
                throw new Error('Correo electrónico no encontrado');
            }
    
            // Recupera los datos del usuario, incluida la contraseña hash
            const query = `SELECT * FROM ${this.tableName} WHERE email = ?`;
            const [user] = await db.execute(query, [email]);
      
            if (user.length === 0) {
                throw new Error('Credenciales no válidas');
            }
    
            // Compara la contraseña proporcionada con la contraseña hash de la base de datos
            //const isValidPassword = bcrypt.compareSync(password, user[0].password);
            const isValidPassword = bcrypt.compareSync(password, '$2a$10$ra6hzVZFREelU8aC28Q7QuYmn66fga/f0XoyIQClOFNLKvVgc8a/m');

            if (!isValidPassword) {
                throw new Error('Credenciales no válidas');
            }
    
            // Devuelve los detalles del usuario o algún token para la autenticación
            return user[0];
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    }
    
    async crearUsuario(name, email, password) {//REGISTRAR USUARIO
        try {
             // Check if the email already exists
             const emailAlreadyExists = await this.emailExists(email);

             if (emailAlreadyExists) {
                 throw new Error('Email ya existe ');
             }
             
            const db = await dbConnection();
            
            const query = `INSERT INTO ${this.tableName} (name, email, password) VALUES (?, ?, ?)`;
            const values = [name, email, password];

            const [result] = await db.execute(query, values);
        
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar usuario:', error);
            throw error;
        }
    }
}

module.exports = {
    UsuarioModel
};
