/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
*/ 

/**
 * Import required packages
 * @constant
 */
const jwt = require("jsonwebtoken");

/**
 * Export an object with functions that 
 * - Register new user
 * - Login all Role
 * @exports roleFunctions
 */
module.exports = {
	/**
	 * verify Admin Function 
	 * @name verifyAdmin
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the list of roles as a json object
	 */
	verifyAdmin: function (req, res, next) {
        const token = req.cookies.access_token;
        console.log("token", token);
        if(!token){
            return res.status(403).json({
                status: 403,
                Note: "You are not authenticated!"
            });
        }
        jwt.verify(token, "veryveryverysecretkey", (err, user)=>{
            if(err){
                return next(res.status(403).json({
                    status: 403,
                    Note: "Token is not Valid!"
                }));
                
            }else{
                req.user = user;
                console.log("req.user ", req.user )
                if (req.user.isAdmin) {
                    console.log("req.user.isAdmin is true")
                    next();
                }else{
                    return next(
                        res.status(403).json({
                        status: 403,
                        Note: "You are not authorised!"
                    }
                ))
                }
            }
        })
	},
};
