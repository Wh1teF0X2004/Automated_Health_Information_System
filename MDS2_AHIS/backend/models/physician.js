/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Mongoose Schema for Physician class
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
 * Generates a random Physician ID
 *
 * @function
 * @returns {string} A random ID in the format 'O<2 random letters>-<4 random numbers>'
 * 
 * @constant
 */
function createId(){
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allNumbers = '0123456789';

    let randomLetters = allLetters[Math.floor(Math.random() * allLetters.length)] + allLetters[Math.floor(Math.random() * allLetters.length)];
    let randomNumbers = allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)];

    const randomNewID = `O${randomLetters}-${randomNumbers}`;
    return randomNewID;
}

/**
 * Create Physician schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * 
 * @property {String} physician_id                      - The unique ID of the physician-in-charge
 * @property {String} physician_firstName               - The first name of the physician-in-charge
 * @property {String} physician_lastName                - The last name of the physician-in-charge
 * @property {Date} birth_date                          - The birthday of the physician-in-charge
 * @property {String} department                        - The department where the physician-in-charge is assigned to
 * 
 * @constant
 */
const physicianSchema = mongoose.Schema({
    physician_id: {
        type: String,
        // unique: true, // Make sure the IDs are unique
        default: createId // Set the default value to the result of createId function
    },
    physician_firstName: {
        type: String,
        required: true,
        validate: {
            validator: isAlphaNumeric,
            message: "Name must only contain alphanumeric characters"
        }
    },
    physician_lastName: {
        type: String,
        required: true,
        validate: {
            validator: isAlphaNumeric,
            message: "Name must only contain alphanumeric characters"
        }
    },
    birth_date: {
        type: Date,
		required: true
    },
    department: {
        type: String,
		required: true
    }
});

/**
 * Export Physician Model that uses Physician schema
 * Mongoose will create a collection named 'physician'
 * 
 * @name Physician
 * @exports Physician
 */
module.exports = mongoose.model("Physician", physicianSchema);