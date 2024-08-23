const express = require("express");
const cookieParser = require('cookie-parser')
require("./Config/database").connect();
require('dotenv').config();
const routes = require('./Route/Auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', routes);

app.listen(PORT, (request, response) => {
	console.log(`App is running on Port ${PORT}`);
})


// default routes
app.get('/',(request, response) =>{
	response.json({
		success:true,
		message:"This is default route."
	})
})
