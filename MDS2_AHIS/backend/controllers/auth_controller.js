/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Controller methods for managing authentication
*/ 

/**
 * Import required packages
 * @constant
 */
const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //  create token when login in successful

/**
 * Export an object with functions that 
 * - Register new user
 * - Login all Role
 * @exports roleFunctions
 */
module.exports = {
	/**
	 * Function that register new user into the database
	 * @name register
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the user object
	 */
	register: async function (req, res) {
		try{
			let roleName = "";
			if(req.body.role == "Admin" || req.body.role == "admin"){
				roleName = "Admin"
			}else{
				roleName = "User"
			}
            const roleObject = await Role.findOne({role: roleName});
			console.log("role", roleName)
            // salt is a string of characters 
            // hash is created by combining the password provided by the user and the salt, and then applying one-way encryption
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt);
			if(roleName == "Admin"){
				newUser = new User({ 
					userFirstName: req.body.userFirstName, 
					userLastName: req.body.userLastName, 
					username: req.body.username,
					userEmail: req.body.userEmail, 
					hash: hashPass,
					profileImage: req.body.profileImage,
					isAdmin: true,
					role: roleObject._id
				});
				console.log("Admin user",newUser)
				await newUser.save();
			}else{
				newUser = new User({ 
					userFirstName: req.body.userFirstName, 
					userLastName: req.body.userLastName, 
					username: req.body.username,
					userEmail: req.body.userEmail, 
					hash: hashPass,
					profileImage: req.body.profileImage,
					role: roleObject._id
				});
				console.log("user",newUser)
				await newUser.save();
			}
			res.status(200).json(newUser); //HTTP response status codes
		} 
		catch (error){
			res.status(500).json({error: "Internal Server Error!"});
		}
	},
	/**
	 * Login Function 
	 * @name login
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns status as a json object
	 */
	login: async function (req, res) {
        try {
            const user = await User.findOne({userEmail: req.body.userEmail}).populate("role", "role");
			console.log("user", user);
			const { role } = user;
            if(!user){
                res.status(404).json({
					status: 404,
					message: "User not found!",
				});
            }else{
                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.hash );
                if(!isPasswordCorrect){
                    res.status(404).json({
						status: 404,
						message: "Password is INCORRECT!",
					});
                }else{
					// this token will be sent to cookie
					const token = jwt.sign(
						{id: user._id, isAdmin: user.isAdmin, role: role}, "veryveryverysecretkey");
						res.cookie("access_token", token, {httpOnly: true}).status(200)
						.json({
							status: 200,
							message: "Login Success",
							data: user
						})
                }
            }      
        } catch (error) {
            res.status(500).json({error: "Internal Server Error!"});
        }
	},
	/**
	 * Authenticate Function 
	 * @name authenticate
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the status json object
	 */
	authenticate: async function (req, res) {
        try {
            const user = await User.findOne({userEmail: req.body.userEmail}).populate("role", "role");
			console.log("userAdmin", user);
			const { role } = user;
            if(!user){
                res.status(404).json({
					status: 404,
					message: "User not found!",
				});
            }else{
				console.log("roleAuth" ,user.role.role);
				if(user.role.role == "Admin" ){
					const isPasswordCorrect = await bcrypt.compare(req.body.password, user.hash );
					if(!isPasswordCorrect){
						res.status(404).json({
							status: 404,
							message: "Password is INCORRECT!",
						});
					}else{
						// this token will be sent to cookie
						const token = jwt.sign(
							{id: user._id, isAdmin: user.isAdmin, role: role}, "veryveryverysecretkey");
							res.cookie("access_token", token, {httpOnly: true}).status(200)
							.json({
								status: 200,
								message: "Login Success",
								data: user
							})
					}
				}else{
					res.status(404).json({
						status: 404,
						message: "Not an Admin!",
					});
				}
            }      
        } catch (error) {
            res.status(500).json({error: "Internal Server Error!"});
        }
	},
};
