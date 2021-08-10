const { Router } = require('express');
const router = Router();
const DogController = require('../controllers/dog.controller');


router.route('/register.json')
  .post(DogController.register);

module.exports = router;
