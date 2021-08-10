const { request, response } = require('express');
const { getConnection } = require('../database');
const bcrypt = require('bcryptjs');
const AuthController = {};


AuthController.signUp = async (req = request, res = response) => {
  const { email, password, telefono, nombre, apaterno, amaterno } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(
      `INSERT INTO cliente(estatus_cliente_id, nombres, apellido_paterno, apellido_materno, email, password, telefono, activo)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [1, nombre, apaterno, amaterno, email, hash, telefono, 1],
    );
    const { insertId } = rows;
    const [registeredItem] = await conn.query(
      `SELECT * FROM cliente c WHERE c.cliente_id = ?`,
      [insertId]
    );
    const {
      estatus_cliente_id,
      cliente_id,
      apellido_paterno,
      apellido_materno,
      ...rest
    } = registeredItem[0];
    return res.status(200).json({
      estatus: estatus_cliente_id,
      data: {
        id: cliente_id,
        apaterno: apellido_paterno,
        amaterno: apellido_materno,
        ...rest
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      data: err
    });
  }
};

AuthController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const conn = await getConnection();
    const [user] = await conn.query(
      `SELECT c.password, c.cliente_id FROM cliente c WHERE c.email = ?`,
      [email]
    );
    const { password: hash, cliente_id: clienteId } = user[0];
    if (bcrypt.compareSync(password, hash)) {
      const [user] = await conn.query(
        `SELECT c.cliente_id as 'id', c.apellido_paterno as 'aPaterno',
        c.apellido_materno as 'aMaterno', c.nombres as 'nombre',
        c.email, c.telefono
        FROM cliente c WHERE c.cliente_id = ?`,
        [clienteId]
      );
      const [perros] = await conn.query(
        `SELECT p.perro_id as 'id', p.tamano_id as 'tamanioId', p.nombre,
        p.raza, p.edad, p.genero, p.comentario
        FROM perro p WHERE p.cliente_id = ?`,
        [clienteId]
      );
      const [claves] = await conn.query(
        `SELECT c.clave_id as 'id', c.clave, c.nombre, c.descripcion, c.fecha1, c.fecha2,
        c.monto_descuento as 'montoDescuento', c.porcentaje, c.activo, c.usos
        FROM clavexcliente cc
        INNER JOIN clave c ON c.clave_id = cc.clave_id
        WHERE cc.cliente_id = ?`,
        [clienteId]
      );
      return res.status(200).json({
        estatus: 1,
        data: {
          user: user[0],
          perros,
          claves
        }
      }).send();
    }
    return res.status(401).json({
      message: "El email o password ingresados son incorrectos"
    }).send();
  } catch (err) {
    return res.status(500).json({
      message: "Credenciales incorrectas"
    }).send();
  }
};

module.exports = AuthController;
