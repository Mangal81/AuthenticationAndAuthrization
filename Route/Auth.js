const express = require('express');
const router = express.Router();


const {signup} = require('../Controller/authController');

router.post('/signup', signup);
// router.post('/login', login); login, 




module.exports = router;

