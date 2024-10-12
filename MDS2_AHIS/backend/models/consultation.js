/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Mongoose Schema for Consultation class
*/ 

/**
 * Import required package to reference the Mongoose package to create your schema:
 * @constant
 */
const mongoose = require("mongoose");

/**
 * Create Consultation schema with the following fields, specifying its type, whether its mandatory and its default value. 
 * @property {String} consultationId        - The Consultation Id
 * @property {String} physicianId           - The name of the physician-in-charge
 * @property {Date} consultationDateTime    - Consultation Date Time
 * -----------General Physical Examination --------------------------------------------
 * @property {String} generalAppearance     - Patient General Appearance
 * @property {String} temperature           - Patient Body Temperature
 * @property {Number} height                - Patient height
 * @property {Number} weight                - Patient weight
 * @property {String} bloodPressure         - Patient blood pressure
 * @property {String} breathingPattern      - Patient breathing pattern
 * @property {String} pupilReflexCondition  - Patient pupil reflex
 * @property {String} nerveReflexCondition  - Patient nerve reflex condition
 * @property {String} other                 - Other added description
 * -----------Patient Subjective Information --------------------------------------------
 * @property {String} patientSymptom        - Patient symptom description
 * @property {ObjectId} patientObjectId     - Array of patient reference
 * @property {ObjectId} diagnosisList       - Array of Diagnosis reference
 * @constant 
 */
const consultationSchema = mongoose.Schema({
    consultationId: {
        type: String,
        default: function(){
            let id = "C";
            let randChar = String.fromCharCode(Math.floor(Math.random() * 26 + 65)) + String.fromCharCode(Math.floor(Math.random() * 26 + 65));
            let randNum = Math.round(Math.random() * 9000 + 1000);
            id += randChar + "-" + randNum;
            return id;
        }
    },
    physicianId: {
        type: String,
        required: true,
    },
    consultationDateTime: {
        type: Date,
        default: function(){
            let date = new Date();
            return date;
        },
    },
    generalAppearance: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    bloodPressure: {
        type: String,
        required: true,
    },
    breathingPattern: {
        type: String,
        required: true,
    },
    pupilReflexCondition: {
        type: String,
        required: true,
    },
    nerveReflexCondition: {
        type: String,
        required: true,
    },
    other: {
        type: String,
        default: "NA",
    },
    patientSymptom: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    diagnosisList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Diagnosis",
		},
	],
        
});

/**
 * Export Consultation Model that uses Consultation schema
 * Mongoose will create a collection named 'consultation'
 * @exports Consultation
 */
module.exports = mongoose.model("Consultation", consultationSchema);