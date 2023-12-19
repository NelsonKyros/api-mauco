const { response } = require("express");
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header("kyros-token");

  if (!token) {
    return res.status(401).json({
      ok:false,
      msg:"No hay token en la petición"
    })
  }
  try {
     const payload = jwt.verify(
      token,
      process.env.SECRET_JWT
    );
     // Asignar el payload verificado a la propiedad 'req'
    req.payload = payload;

    // Llama a next() para continuar con el siguiente middleware o manejador de ruta
    next();
  } catch (error) {
    return res.status(401).json({
      ok:false,
      msg:"Token no válido"
    })
  }
 
};

module.exports = {
  validarJWT,
};
