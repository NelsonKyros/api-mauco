/*
    Rutas de Usuario / Auth consulta
    host + /api/auth
*/

const { Router } = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validator-campos");
const { validarJWT } = require("../middlewares/validator-jws");
const router = Router();

console.log("Antes de la definición de la ruta");

router.post(
  "/registro",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe ser a lo menos de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe ser a lo menos de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);
router.get("/token",validarJWT,revalidarToken);
console.log("Después de la definición de la ruta");


module.exports = router;
