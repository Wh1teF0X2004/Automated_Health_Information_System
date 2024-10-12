/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Mongoose Schema for Prescription class
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema
 * 
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Function to check if a string is alphanumeric 
 * Accepts whitespace
 *
 * @function
 * @param {string} value - The string to be checked
 * @returns {boolean} - `true` if the input string is alphanumeric, `false` otherwise
 * 
 * @constant
 */
function isAlphaNumeric(value) {
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === ' ')) {
            return false;
        }
    }
    return true;
}

/**
 * Generates a random prescription ID
 *
 * @function
 * @returns {string} A random ID in the format 'R<2 random letters>-<4 random numbers>'
 * 
 * @constant
 */
function createId(){
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allNumbers = '0123456789';

    let randomLetters = allLetters[Math.floor(Math.random() * allLetters.length)] + allLetters[Math.floor(Math.random() * allLetters.length)];
    let randomNumbers = allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)];

    const randomNewID = `R${randomLetters}-${randomNumbers}`;
    return randomNewID;
}

/**
 * Create prescription schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * 
 * @property {String} prescription_id                   - The unique ID of the prescription
 * @property {String} prescription_name                 - The name of the prescription, can be understood also as a short description of the prescription
 * @property {String} patient_id                        - The unique ID of the patient
 * @property {String} diagnosisId                       - The unique ID of the diagnosis
 * @property {String} physician_id                      - The ID of the physician-in-charge
 * @property {String} medication_id                     - The unique ID of the medication
 * @property {Number} prescription_dosage               - The dosage per consumption for the medication 
 * @property {Date} prescription_startdate              - The date where the medication must be consume starting from
 * @property {Date} prescription_enddate                - The date where the medication must be fully consumed by
 * @property {Number} prescription_freqency             - The frequency of consumption of medication per day
 * @property {String} prescription_specialinstructions  - Special instruction or notes by physician to patient regarding the consumption of the medication
 * 
 * @constant
 */
const prescriptionSchema = mongoose.Schema({
    prescription_id: {
        type: String,
        // unique: true, // Make sure the IDs are unique
        default: createId // Set the default value to the result of createId function
    },
    prescription_name: {
        type: String,
        required: true,
        validate: {
            validator: isAlphaNumeric,
            message: "Prescription name must only contain alphanumeric characters"
        }
    },
    patient_id: {
        type: String,
		required: true
    },
    physician_id: {
        type: String,
        required: true
    },
    diagnosisId:{
        type: String,
        required: true
    },
    medication_id: {
        type: String,
		required: true
    },
    prescription_dosage: {
        type: Number,
		required: true
    },
    prescription_startdate: {
        type: Date,
		required: true
    },
    prescription_enddate: {
        type: Date,
		required: true
    },
    prescription_freqency: {
        type: Number,
		required: true
    },
    prescription_specialinstructions: {
        type: String
    }
});

/**
 * Export Prescription Model that uses Prescription schema
 * Mongoose will create a collection named 'prescription'
 * 
 * @name Prescription
 * @exports Prescription
 */
module.exports = mongoose.model("Prescription", prescriptionSchema);