const { request, response } = require('express');
const { getConnection } = require('../database');
const InfoController = {};

InfoController.faq = async (req, res = response) => {
  try {
    const conn = await getConnection();
    const [faqs] = await conn.query(`SELECT * FROM FAQ`);
    return res.status(200).json({
      estatus: 1,
      data: [...faqs]
    })
  } catch (error) {
    
  }
};

module.exports = InfoController;
