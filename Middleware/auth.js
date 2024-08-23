require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth
exports.auth = async (request, response, next) => {
	try {
		const token = request.body.token || request.cookies.token || request.header("Authorization").replace("Bearer ", "");
		if(!token){
			return response.status(401).json({
				success:false,
				message:"Token missing"
			})
		}
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decodedToken);
			request.user = decodedToken;
		} 
		catch (error) {
			console.log(error)
			return response.status(401).json({
				success:false,
				message:"Token invalid"
			})
		}
		next();

	} catch (error) {
		console.log(error);
		response.status(500).json({
			success:false,
			message:"Internal server error",
			error:error.message
		})
	}
}

//isStudent
exports.isStudent = (request, response, next) =>{
	try {
		if(request.user.role !== "Student"){
			return response.status(401).json({
				success:false,
				message:"You are not a Student"
			})
		}
		response.status(200).json({
			success:true,
			data:request.user,
			message:"Welcome you are a Student"
		})
		next();
	} catch (error) {
		console.log(error);
		response.status(500).json({
			success:false,
			message:"Internal server error",
			error:error.message
		})
	}
}

//isAdmin
exports.isAdmin = (request, response, next) =>{
	try {
		if(request.user.role !== "Admin"){
			return response.status(401).json({
				success:false,
				message:"You are not a Admin"
			})
		}
		response.status(200).json({
			success:true,
			data:request.user,
			message:"Welcome you are a Admin"
		})
		next();
	} catch (error) {
		console.log(error);
		response.status(500).json({
			success:false,
			message:"Internal server error",
			error:error.message
		})
	}
}
