/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Mongoose Schema for Diagnosis class
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema:
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Create Diagnosis schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * @property {String} diagnosisId               - The Diagnosis Id
 * @property {String} diagnosisDescription      - Required Diagnosis description
 * @property {String} diagnosisAdditional       - Diagnosis Addiotional note
 * @property {Date} diagnosisDate               - Diagnosis default value to the current date/time
 * @property {String} physicianId                - The name of the physician-in-charge
 * @property {ObjectId} patientId               - patient id reference
 * @property {ObjectId} consultationId          - consultation id reference
 * @property {ObjectId} prescriptionList        - Array of Prescription reference
 * @constant 
 */
const diagnosisSchema = mongoose.Schema({
    diagnosisId: {
        type: String,
        default: function(){
            let id = "D";
            let randChar = String.fromCharCode(Math.floor(Math.random() * 26 + 65)) + String.fromCharCode(Math.floor(Math.random() * 26 + 65));
            let randNum = Math.round(Math.random() * 9000 + 1000);
            id += randChar + "-" + randNum;
            return id;
        }
    },
    diagnosisDescription: {
        type: String,
        required: true,
    },
    diagnosisAdditional: {
        type: String,
        default: "NA",
    },
    diagnosisDate: {
        type: Date,
        default: function(){
            let date = new Date();
            return date;
        },
    },
    physicianId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    consultationId: {
        type: String,
        required: true,
    },
    prescriptionList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Prescription",
		},
	],

        
});

/**
 * Export Diagnosis Model that uses Diagnosis schema
 * Mongoose will create a collection named 'diagnosis'
 * @exports Diagnosis
 */
module.exports = mongoose.model("Diagnosis", diagnosisSchema);