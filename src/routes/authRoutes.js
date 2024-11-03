const express = require('express');
const { register, login, validateToken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', validateToken);

module.exports = router;
