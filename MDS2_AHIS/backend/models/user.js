/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Mongoose Schema for User class
 * Mongoose schema defines the structure of the document, default values, validators, etc., 
 * whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema:
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Create User schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * @property {String} userFirstName             - User first name
 * @property {String} userLastName              - User last name 
 * @property {String} username                  - User username
 * @property {String} userEmail                 - User email 
 * @property {String} hash                      - User hash, hash is created by combining the password provided by the user and the salt, and then applying one-way encryption.
 * @property {String} profileImage              - User profile image
 * @property {Boolean} isAdmin                  - whether user is an admin or not
 * @property {Boolean} role                     - referemce to user role
 * 
 * @constant 
 */
const userSchema = mongoose.Schema({
    userFirstName: {
        type: String,
        required: true,
    },
    userLastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false,
        default: './src/assets/images/femaleNurse.png'
    }, 
    isAdmin:{
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Role",
    },

        
},
{
    timestamps:true

});

/**
 * Export User Model that uses User schema
 * Mongoose will create a collection named 'user'
 * @exports User
 */
module.exports = mongoose.model("User", userSchema);