const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = (request, response) => {
	try {
		mongoose.connect(process.env.DB_URL)
		.then(() => {
			console.log("Database connected successfully")
		})
		.catch((err) => {
			console.log(err.message);
		});
	} 
	catch (error) {
		console.log(error.message);
	}
}