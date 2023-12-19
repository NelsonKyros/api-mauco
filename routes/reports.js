/*
    Rutas de Reportes / Report consultas
    host + /api/v1/reporte
*/

const { Router } = require("express");
const { getReporte1 } = require("../controllers/reports");
const { validarJWT } = require("../middlewares/validator-jws");

const router = Router();

router.get("/rpt_1",validarJWT,getReporte1);

module.exports = router;