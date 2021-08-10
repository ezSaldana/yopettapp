const { Router } = require('express');
const router = Router();
const InfoController = require('../controllers/info.controller');

router.route('/faq.json')
  .get(InfoController.faq);

module.exports = router;
