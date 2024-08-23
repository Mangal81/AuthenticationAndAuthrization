const express = require("express");
require("./Config/database").connect();
require('dotenv').config();
const routes = require('./Route/Auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, (request, response) => {
	console.log(`App is running on Port ${PORT}`);
})


app.use('/api/v1', routes);
// default routes
app.get('/',(request, response) =>{
	response.json({
		success:true,
		message:"This is default route."
	})
})
