const express = require('express');
const router = express.Router();


const {login, signup} = require('../Controller/authController');
const {auth, isAdmin, isStudent} = require("../Middleware/auth");

router.post('/signup', signup);
router.post('/login', login);  

// authrised routes
router.get("/test", auth, (req, res) =>{
	res.json({
		success:true,
		message:"Good this is test route"
	})
})
router.get("/student", auth, isStudent);
router.get("/admin", auth, isAdmin);


module.exports = router;

