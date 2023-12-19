const express = require('express');
const mysql = require('mysql');
const { dbConnection } = require('../database/config');

const getReporte1 = async (req, res) => {
    try {
      const db = await dbConnection();
      const consulta = 'SELECT * FROM redcap_reporte_mauco';
      const [resultados] = await db.query(consulta);
  
      res.json({
        ok: true,
        msg: 'Get Reporte 1',
        data: resultados,
      });
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

module.exports = { 
    getReporte1
}