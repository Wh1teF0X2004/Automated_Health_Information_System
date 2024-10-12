/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Mongoose Schema for Medication class
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
 * Generates a random medication ID
 *
 * @function
 * @returns {string} A random ID in the format 'M<2 random letters>-<4 random numbers>'
 * 
 * @constant
 */
function createId(){
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allNumbers = '0123456789';

    let randomLetters = allLetters[Math.floor(Math.random() * allLetters.length)] + allLetters[Math.floor(Math.random() * allLetters.length)];
    let randomNumbers = allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)];

    const randomNewID = `M${randomLetters}-${randomNumbers}`;
    return randomNewID;
}

/**
 * Create Medication schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * 
 * @property {String} medication_id                 - The unique ID of the medication
 * @property {String} medicine_name                 - The name of the medication
 * @property {String} medication_routeofadmission   - How medication should be administered
 * @property {Number} medication_concentration      - The concentration of the medication
 * @property {Number} medication_volume             - The volume of the medication
 * 
 * @constant
 */
const medicationSchema = mongoose.Schema({
    medication_id: {
        type: String,
        // unique: true, // Make sure the IDs are unique
        default: createId // Set the default value to the result of createId function
    },
    medicine_name: {
        type: String,
        required: true,
        validate: {
            validator: isAlphaNumeric,
            message: "Medication name must only contain alphanumeric characters"
        }
    },
    medication_routeofadmission: {
        type: String
    },
    medication_concentration: {
        type: Number
    },
    medication_volume: {
        type: Number
    }
});

/**
 * Export Medication Model that uses Medication schema
 * Mongoose will create a collection named 'medications'
 * 
 * @name Medication
 * @exports Medication
 */
module.exports = mongoose.model("Medication", medicationSchema);