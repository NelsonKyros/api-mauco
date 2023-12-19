const express = require('express');
const { UsuarioModel } = require('../models/UsuarioModel');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const usuarioModel = new UsuarioModel();

const crearUsuario = async (req, res = express.response) => {
    const { name, email, password } = req.body;
   
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const newEncryptar = bcrypt.hashSync(password, salt);
        const usuarioId = await usuarioModel.crearUsuario(name, email, newEncryptar);
    
        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            usuarioId,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario ' + error,
        });
    }
};


const loginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;

    try {
        const usuarioModel = new UsuarioModel();
        const usuario = await usuarioModel.loginUsuario(email, password);
        const token = await generarJWT(usuario.id,usuario.name)

        if (usuario) {
            res.status(200).json({
                ok: true,
                msg: 'Inicio de sesión exitoso',
                usuarioId: usuario.id,
                usuario: usuario.name,
                token
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error.message);
        res.status(500).json({
            ok: false,
            msg: 'Error durante el inicio de sesión',
        });
    }
}


const revalidarToken = async(req, res = express.response) => {

    const {uid,name} = req
    const token = await generarJWT(uid,name)
    res.json({
        ok: true,
        msg: "Token de Usuario",
        token,
        uid,
        name
    });
}

module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}

