const UserSchema = require('../Model/auth');
const bcrypt = require('bcrypt');

exports.signup = async (request, response) => {
	try {
		const {name, email, password, role} = request.body;
		if(!name || !email || !password || !role){
			return response.status(401).json({
				success:false,
				message:"Anyone field can't be empty"
			})
		}

		const user = await UserSchema.findOne({email});
		if(user){
			return response.status(401).json({
				success:false,
				message:"User already exist"
			})
		}

		let hashPassword;
		try {
			hashPassword = await bcrypt.hash(password, 10);
		} 
		catch (error) {
			return response.json({
				success:false,
				message:"Unable to hash password"
			})
		}

		const registerUser =  await UserSchema.create({name, email, password:hashPassword, role});

		response.status(200).json({
			success:true,
			data:registerUser,
			message:"User created successfully"
		})
	} 
	catch (error) {
		console.log(error);
		return response.status(500).json({
			success:false,
			message:"Internal server error",
			error:error.message
		})
	}
}

