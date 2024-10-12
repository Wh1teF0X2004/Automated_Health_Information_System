/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Mongoose Schema for Patient class
 * Mongoose schema defines the structure of the document, default values, validators, etc., 
 * whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema:
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Create Patient schema with the following fields, specifying its type, whether its mandatory and its default value.
 * - ?upload pic of patient registration form
 * @property {String} patientId             - The Patient Id
 * @property {String} firstName             - required with validator, Patient first name
 * @property {String} lastName              - required with validator, Patient last name
 * @property {Date} birthDate               - required, Patient Birth Date
 * @property {String} gender                - required, Patient gender
 * @property {String} nationality           - required with validator, Patient nationality
 * @property {String} maritalStatus          required, Patient marital status
 * @property {String} identificationNum     - required with validator, Patient identification number
 * @property {Date} admitDate               - Patient admission date
 * @property {String} streetAddress         - required with validator, Patient street address
 * @property {String} city                  - required with validator, Patient city address
 * @property {String} state                 - required with validator, Patient state address
 * @property {String} postalCode            - required with validator, Patient postal code
 * @property {String} email                 - required, Patient email address
 * @property {String} tel                   - required, Patient telephone number
 * @property {String} emgcyFName            - required, Patient emergency contact first name
 * @property {String} emgcyLName            - required, Patient emergency contact last name
 * @property {String} emgcyRelationship     - required, Patient emergency contact relationship
 * @property {String} emgcyTel              - required, Patient emergency contact number
 * @property {ObjectId} appointmentList     - Array of Appointment reference
 * @property {ObjectId} diagnosisList       - Array of Diagnosis reference
 * @property {ObjectId} consultationList      - Array of Consultation reference
 * @constant
 */
const patientSchema = mongoose.Schema({
    patientId: {
        type: String,
        default: function(){
            let id = "P";
            let randChar = String.fromCharCode(Math.floor(Math.random() * 26 + 65)) + String.fromCharCode(Math.floor(Math.random() * 26 + 65));
            let randNum = Math.round(Math.random() * 9000 + 1000);
            id += randChar + "-" + randNum;
            return id;
        }
    },
    firstName:{
        type: String,
		required: true,
        validate: {
		 	validator: function (str) {
                // Regular expression to allow alphabets and space
		 		return /^[a-zA-Z\s]+$/.test(str);
		 	},
		 	message: "First Name can only be alphabet values", 
        }
    },
    lastName:{
        type: String,
		required: true,
        validate: {
            validator: function (str) {
               // Regular expression to allow alphabets and space
                return /^[a-zA-Z\s]+$/.test(str);
            },
            message: "Last Name can only be alphabet values", 
       }
    },
    birthDate: {
        type: Date,
		required: true
    },
    gender: {
        type: String,
		required: true,
    },
    nationality: {
        type: String,
		required: true,
        validate: {
			validator: function (str) {
                // Regular expression to allow alphabets and space
				return /^[a-zA-Z\s]+$/.test(str);
			},
			message: "Nationality can only be alphabet values", 
        }
    },
    maritalStatus:{
        type: String,
		required: true,
    },
    identificationNum: {
        type: String,
		required: true,
    },
    admitDate:{
        type: Date,
        default: function(){
            let date = new Date();
            return date;
        },
    },
    streetAddress:{
        type: String,
		required: true
    },
    city:{
        type: String,
		required: true,
        validate: {
			validator: function (str) {
                // Regular expression to allow alphabets and space
				return /^[a-zA-Z\s]+$/.test(str);
			},
			message: "City can only be alphabet values", 
        }
    },
    state:{
        type: String,
		required: true,
        validate: {
			validator: function (str) {
                // Regular expression to allow alphabets and space
				return /^[a-zA-Z\s]+$/.test(str);
			},
			message: "State can only be alphabet values", 
        }
    },
    postalCode:{
        type: Number,
		required: true,
    },
    email:{
        type: String,
		required: true,
    },
    tel:{
        type: String,
		required: true
    },
    emgcyFName:{
        type: String,
		required: true,
        validate: {
		 	validator: function (str) {
                // Regular expression to allow alphabets and space
		 		return /^[a-zA-Z\s]+$/.test(str);
		 	},
		 	message: "First Name can only be alphabet values", 
        }
    },
    emgcyLName:{
        type: String,
		required: true,
        validate: {
		 	validator: function (str) {
                // Regular expression to allow alphabets and space
		 		return /^[a-zA-Z\s]+$/.test(str);
		 	},
		 	message: "Last Name can only be alphabet values", 
        }
    },
    emgcyRelationship:{
        type: String,
		required: true
    },
    emgcyTel:{
        type: String,
		required: true
    },
    appointmentList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
		},
	],
    diagnosisList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Diagnosis",
		},
	],
    consultationList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Consultation",
		},
	],
});

/**
 * Export Patient Model that uses Patient schema
 * Mongoose will create a collection named 'patients
 * @exports Patient
 */
module.exports = mongoose.model("Patient", patientSchema);