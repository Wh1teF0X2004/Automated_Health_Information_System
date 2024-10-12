/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
*/ 

/**
 * Import required packages
 * @constant
 */
const Patient = require("../models/patient");
const Consultation = require("../models/consultation");
const Diagnosis = require("../models/diagnosis");
const Appointment = require("../models/appointment");
const fs = require("fs");
const multer = require('multer');

/**
 * Export an object with functions that 
 * - Insert new patient
 * - List all patients
 * - Delete patient by Id
 * - Update patient info by Id
 * @exports patientFunctions
 */
module.exports = {
	/**
	 * Function that insert new patient into the database
	 * @name addPatient
	 * @function
	 * @param {Object} req - includes firstName, lastName, birthDate, gender, nationality, maritalStatus, identificationNum,
     *                       streetAddress, city, state, postalCode, email and tel of the patient 
	 * 						 and patient emergency contact name, relationship and tel.
	 * @param {Object} res - returns the id of the patient as a json object
	 */
	addPatient: async function (req, res) {
		try{
			aPatient = new Patient({ 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                birthDate: req.body.birthDate,
                gender: req.body.gender, 
                nationality: req.body.nationality,
                maritalStatus: req.body.maritalStatus, 
                identificationNum: req.body.identificationNum, 
                streetAddress: req.body.streetAddress,
                city: req.body.city, 
                state: req.body.state, 
                postalCode: req.body.postalCode,
                email: req.body.email, 
                tel: req.body.tel,
				emgcyFName: req.body.emgcyFName,
                emgcyLName: req.body.emgcyLName,
                emgcyRelationship: req.body.emgcyRelationship,
                emgcyTel: req.body.emgcyTel
            });
			console.log(aPatient)
			await aPatient.save();

			res.status(200).json(aPatient); //HTTP response status codes
		} 
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
	},
	/**
	 * Function that list all patients in the database
	 * @name getAll
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the list of patients as a json object
	 */
	getAll: async function (req, res) {
		let patients = await Patient.find().populate("appointmentList").populate("diagnosisList");
		res.status(200).json(patients);
	},
	/**
	 * Function that delete a patient by its id
	 * @name deleteById
	 * @function
	 * @param {Object} req - includes the id of the patient
	 * @param {Object} res - returns the deleted patient as a json object
	 */
	deleteById: async function (req, res) {
		try{
			let patient = await  Patient.findOne({ patientId: req.body.patientId });
			let appointmentListLength = patient.appointmentList.length;
            let diagnosisListLength = patient.diagnosisList.length;
            let consultationListLength = patient.consultationList.length;

			// Remove and delete any appointments related to the patient
			for(let i=0; i < appointmentListLength; i++){
				let appointmentId = patient.appointmentList[patient.appointmentList.length-1];
				patient.appointmentList.pop(appointmentId);
				await Appointment.deleteOne({ _id: appointmentId });
			}

            // Remove and delete any diagnosis related to the patient
			for(let i=0; i < diagnosisListLength; i++){
				let diagnosisId = patient.diagnosisList[patient.diagnosisList.length-1];
				patient.diagnosisList.pop(diagnosisId);
				await Diagnosis.deleteOne({ _id: diagnosisId });
			}

            // Remove and delete any medication related to the patient
			for(let i=0; i < consultationListLength; i++){
				let consultationId = patient.consultationList[patient.consultationList.length-1];
				patient.consultationList.pop(consultationId);
				await Consultation.deleteOne({ _id: consultationId });
			}
			await patient.save();
			let deletePatient = await Patient.deleteOne({ _id: patient._id });

			res.status(200).json(deletePatient);
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
     },
	/**
	 * Function that update patient information by its id
	 * @name updatePatient
	 * @function
	 * @param {Object} req - includes the id of the patient, and the new maritalStatus, streetAddress, city, state, 
     *                       postalcode, emailand tel of the patient and patient emergency contact person name, relationship and tel
	 * @param {Object} res - returns the status of the update as a json object
	 */
    updatePatient: async function (req, res) {
		console.log("Backend controller update Patient", req.body)
		try{
			let patient = await  Patient.findOneAndUpdate({ patientId: req.body.patientId }, 
				{   maritalStatus: req.body.maritalStatus, 
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    state: req.body.state,
                    postalcode: req.body.postalcode,
                    email: req.body.email,
                    tel: req.body.tel,
					emgcyFName: req.body.emgcyFName,
                    emgcyLName: req.body.emgcyLName,
                    emgcyRelationship: req.body.emgcyRelationship,
                    emgcyTel: req.body.emgcyTel
                },
				{new: true});
			let status = "";
			// Return the correct status message accordingly
			if(patient  === null){
				status = "ID not found"
			}
			else{
				status = "Patient information updated successfully"
			}
			res.status(200).json({
				"status": status
			});
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
	 },
};
