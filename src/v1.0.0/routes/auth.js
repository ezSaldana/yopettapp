const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');

router.route('/signup.json')
  .post(authController.signUp);

router.route('/login.json')
  .post(authController.login);

module.exports = router;
