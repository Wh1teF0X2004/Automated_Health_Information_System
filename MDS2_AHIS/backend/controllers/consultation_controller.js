/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
*/ 

/**
 * Import required packages
 * @constant
 */
const Patient = require("../models/patient");
const Diagnosis = require("../models/diagnosis");
const Consultation = require("../models/consultation");

/**
 * Export an object with functions that 
 * - Insert new Consultation
 * - List all Consultation
 * - Delete Consultation by Id
 * - Update Consultation info by Id
 * @exports consultationFunctions
 */
module.exports = {
	/**
	 * Function that insert new consultation into the database
	 * @name addConsultation
	 * @function
	 * @param {Object} req - includes physicianId, generalAppearance, height, weight, bloodPressure, breathingPattern
     *                       pupilReflexCondition, nerveReflexCondition, other, patientSymptom, patientId, temperature
	 * @param {Object} res - returns the id of the consultation as a json object
	 */
	addConsultation: async function (req, res) {
		try{
			aConsultation = new Consultation({ 
                physicianId: req.body.physicianId, 
                generalAppearance: req.body.generalAppearance, 
				temperature: req.body.temperature,
                height: req.body.height,
                weight: req.body.weight, 
                bloodPressure: req.body.bloodPressure,
				breathingPattern: req.body.breathingPattern,
                pupilReflexCondition: req.body.pupilReflexCondition,
				nerveReflexCondition: req.body.nerveReflexCondition,
                other: req.body.other,
                patientSymptom: req.body.patientSymptom,
                patientId: req.body.patientId
            });
			console.log(aConsultation)
			await aConsultation.save();

			// Add the consultation to related patient object consultationList
            await  Patient.findOneAndUpdate(
                { patientId: req.body.patientId }, 
				{ $push: {consultationList: aConsultation._id} },
				{new: true});

			res.status(200).json(aConsultation); //HTTP response status codes
		} 
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
	},
	/**
	 * Function that list all Consultation in the database
	 * @name getAll
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the list of diagnosis as a json object
	 */
	getAll: async function (req, res) {
		let consultation = await Consultation.find().populate("diagnosisList");
		res.status(200).json(consultation);
	},
	/**
	 * Function that delete a Consultation by its id
	 * @name deleteById
	 * @function
	 * @param {Object} req - includes the id of the diagnosis
	 * @param {Object} res - returns the deleted diagnosis as a json object
	 */
	deleteById: async function (req, res) {
		console.log("Backend controller DELETE Consultation", req.body)
		try{
			let consultation = await  Consultation.findOne({ consultationId: req.body.consultationId });
            let diagnosisListLength = consultation.diagnosisList.length;
			console.log("Backend Consultation", consultation)

			// Remove and delete any diagnosis related to the consultation
			for(let i=0; i < diagnosisListLength; i++){
				let diagnosisId = consultation.diagnosisList[consultation.diagnosisList.length-1];
				consultation.diagnosisList.pop(diagnosisId);
				await Diagnosis.deleteOne({ _id: diagnosisId });
			}
			await consultation.save();

            // Remove and delete the consultation related to the patient
			await Patient.updateMany({ patientId: consultation.patientId }, { $pull: { consultationList: consultation._id } });

			// Delete the Consultation object
			let deleteConsultation = await Consultation.deleteOne({ _id: consultation._id });

			res.status(200).json(deleteConsultation);
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
     },
	/**
	 * Function that update Consultation information by its id
	 * @name updatConsultation
	 * @function
	 * @param {Object} req - includes the id of the Consultation, and the new other, patientSymptom
	 * @param {Object} res - returns the status of the update as a json object
	 */
    updateConsultation: async function (req, res) {
		console.log("Backend controller update Consultation", req.body)
		try{
			let consultation = await  Consultation.findOneAndUpdate({ consultationId: req.body.consultationId }, 
				{   other: req.body.other,
                    patientSymptom: req.body.patientSymptom,
                },
				{new: true});
			let status = "";
			// Return the correct status message accordingly
			if(consultation  === null){
				status = "ID not found"
			}
			else{
				status = "Consultation information updated successfully"
			}
			res.status(200).json({
				"status": status
			});
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
	 }
};
