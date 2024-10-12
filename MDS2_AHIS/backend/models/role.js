/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Mongoose Schema for Role class
 * Mongoose schema defines the structure of the document, default values, validators, etc., 
 * whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema:
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Create Role schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * @property {String} role             - User role
 * 
 * @constant 
 */
const roleSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
    }
},
{
    timestamps:true

});

/**
 * Export Role Model that uses Role schema
 * Mongoose will create a collection named 'role'
 * @exports Role
 */
module.exports = mongoose.model("Role", roleSchema);