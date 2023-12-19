//const functions = require('firebase-functions');
const express = require("express");
const { dbConnection } = require("./database/config");


require("dotenv").config();
//Conexión Base de Datos
dbConnection();
//inicializacin Express y Carpeta Public
const app = express();
app.use(express.static("public"));

//Letuta y parseo del Body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth")); //Login
app.use("/api/v1/reporte", require("./routes/reports"));//Obtener Reporte

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor backend corriendo en http://localhost:${process.env.PORT}`
  );
});
