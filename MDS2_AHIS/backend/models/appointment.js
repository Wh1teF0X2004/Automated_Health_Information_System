/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Mongoose Schema for Appointment class
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
 * Generates a random appointment ID
 *
 * @function
 * @returns {string} A random ID in the format 'A<2 random letters>-<4 random numbers>'
 * 
 * @constant
 */
function createId(){
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allNumbers = '0123456789';

    let randomLetters = allLetters[Math.floor(Math.random() * allLetters.length)] + allLetters[Math.floor(Math.random() * allLetters.length)];
    let randomNumbers = allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)] + allNumbers[Math.floor(Math.random() * allNumbers.length)];

    const randomNewID = `A${randomLetters}-${randomNumbers}`;
    return randomNewID;
}

/**
 * Create Appointment schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * 
 * @property {String} appointment_id        -  The unique ID of the appointment
 * @property {String} doctor_name           - The name of the physician-in-charge
 * @property {String} patient_firstName     - The first name of the patient
 * @property {String} patient_lastName      - The last name of the patient
 * @property {String} appointment_venue     - The location where the appointment is held at
 * @property {Date} appointment_time        - The starting time of the appointment
 * @property {Number} appointment_duration  - The duration of the appointment, default duration is 1 hour
 * 
 * @constant
 */
const appointmentSchema = mongoose.Schema({
    appointment_id: {
        type: String,
        // unique: true, // Make sure the IDs are unique
        default: createId // Set the default value to the result of createId function
    },
    physician_id: {
        type: String,
        required: true,
    },
    patient_id: {
        type: String,
        required: true,
    },
    appointment_venue: {
        type: String,
		required: true
    },
    appointment_time: {
        type: Date,
		required: true
    },
    appointment_duration: {
        type: Number,
        default: 60 // Default duration is 1 hour which is 60 minutes
    }
});

/**
 * Export Appointment Model that uses Appointment schema
 * Mongoose will create a collection named 'appointments'
 * 
 * @name Appointment
 * @exports Appointment
 */
module.exports = mongoose.model("Appointment", appointmentSchema);