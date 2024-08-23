const UserSchema = require('../Model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async (request, response) =>{
	try {
		const{email, password} = request.body;
		let user = await UserSchema.findOne({email});
		if(!email || !password){
			return response.status(401).json({
				success:false,
				message:"Anyone field can't be empty"
			})
		}
		if(!user){
			return response.status(401).json({
				success:false,
				message:'User does not exist'
			})
		}
		if(await bcrypt.compare(password, user.password)){
			const payload = {
				email:user.email,
				id:user._id,
				role:user.role
			}
			
			let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

			user = user.toObject();
			user.token = token;
			user.password = undefined;

			const option = {
				expire :new Date(Date.now()*60*60*1000),
				httpOnly:true
			}

			response.cookie("token", token, option).status(200).json({
				success:true,
				data:user,
				token:token,
				message:"User logged in successfully"
			})

		}
		else{
			return response.status(401).json({
				success:false,
				message:"Password is not correct"
			})
		}
	} 
	catch (error) {
		console.log(error);
		response.status(500).json({
			success:false,
			message:"Internal server error",
			error:error.message
		})
	}

}

