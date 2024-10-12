/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Controller methods for managing roles
*/ 

/**
 * Import required packages
 * @constant
 */
const Role = require("../models/role");

/**
 * Export an object with functions that 
 * - Insert new Role
 * - List all Role
 * - Delete Role by Id
 * - Update Role info by Id
 * @exports roleFunctions
 */
module.exports = {
	/**
	 * Function that insert new Role into the database
	 * @name addRole
	 * @function
	 * @param {Object} req - includes role
	 * @param {Object} res - returns the id of the role as a json object
	 */
	addRole: async function (req, res) {
		try{
            if(req.body.role && req.body.role !== ''){
                const newRole = new Role({ 
                    role: req.body.role
                });
                console.log(newRole)
                await newRole.save();
                res.status(200).json(newRole); //HTTP response status codes
                
            }else{
                res.status(400).json({ error: "Theres an Invalid Data"});
            }
		} 
		catch (error){
			res.status(500).send("Internal Server Error!");
		}
	},
	/**
	 * Function that list all roles in the database
	 * @name getAll
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the list of roles as a json object
	 */
	getAll: async function (req, res) {
        try {
            let roles = await Role.find();
		    res.status(200).json(roles);
            
        } catch (error) {
            res.status(500).send("Internal Server Error!");
        }
	},
	/**
	 * Function that delete a role by its id
	 * @name deleteById
	 * @function
	 * @param {Object} req - includes the id of the role
	 * @param {Object} res - returns the deleted role as a json object
	 */
	deleteById: async function (req, res) {
		try{
			let deleteRole = await Role.deleteOne({ _id: req.body.roleId });

			res.status(200).json(deleteRole);
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
     },
	/**
	 * Function that update Role information by its id
	 * @name updateRole
	 * @function
	 * @param {Object} req - includes the id of the Role
	 * @param {Object} res - returns the status of the update as a json object
	 */
    updateRole: async function (req, res) {
		console.log("Backend controller update role", req.body)
		try{
            const aRole = await Role.findById({_id: req.body.roleId});
            if(aRole){
                let role = await  Role.findOneAndUpdate({ _id: req.body.roleId }, 
                    { role: req.body.role },
                    { new: true });
                    res.status(200).json({
                        status: "role updated successfully"
                    });
            }else{
                res.status(404).json({ error: "Role not found"});
            }
		}
		catch(error){
			res.status(500).send("Internal Server Error!");
		}
	 },
};
