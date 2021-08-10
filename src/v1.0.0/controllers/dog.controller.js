const { request, response } = require('express');
const { getConnection } = require('../database');
const DogController = {};

DogController.register = async (req = request, res = response) => {
  const {
    cliente_id,
    tamano_id,
    nombre,
    edad,
    raza,
    genero,
    comentario
  } = req.body;
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(
      `INSERT INTO perro(cliente_id, tamano_id, nombre, edad, raza, genero, comentario)
      VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [cliente_id, tamano_id, nombre, edad, raza, genero, comentario]
    );
    const { insertId } = rows;
    const [registeredDog] = await conn.query(
      `SELECT * FROM perro p WHERE p.perro_id = ?`,
      [insertId]
    );
    const {
      perro_id: perroId,
      tamano_id: tamanioId,
      ...rest
    } = registeredDog[0];
    return res.status(200).json({
      estatus: 1,
      data: {
        perroId,
        tamanioId,
        ...rest
      }
    }).send();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      err
    }).send();
  }
};

module.exports = DogController;
