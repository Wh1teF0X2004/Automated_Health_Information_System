/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
*/ 

/**
 * Import required packages
 * @constant
 */
const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
const Diagnosis = require("../models/diagnosis");
const Consultation = require("../models/consultation");

/**
 * Export an object with functions that 
 * - Insert new diagnosis
 * - List all diagnosis
 * - Delete diagnosis by Id
 * - Update diagnosis info by Id
 * @exports diagnosisFunctions
 */
module.exports = {
	/**
	 * Function that insert new patient into the database
	 * @name addDiagnosis
	 * @function
	 * @param {Object} req - includes diagnosisDescription, diagnosisAdditional, physicianId, patientId, consultationId
	 * @param {Object} res - returns the id of the diagnosis as a json object
	 */
	addDiagnosis: async function (req, res) {
		try{
			aDiagnosis = new Diagnosis({ 
                diagnosisDescription: req.body.diagnosisDescription, 
                diagnosisAdditional: req.body.diagnosisAdditional, 
                physicianId: req.body.physicianId,
                gender: req.body.gender, 
                patientId: req.body.patientId,
				consultationId: req.body.consultationId
            });
			console.log(aDiagnosis)
			await aDiagnosis.save();

			// Add the diagnosis to related patient object diagnosisList
            await  Patient.findOneAndUpdate(
                { patientId: req.body.patientId }, 
				{ $push: {diagnosisList: aDiagnosis._id} },
				{new: true});
			
			// Add the diagnosis to related Consultation object
			await  Consultation.findOneAndUpdate(
				{ consultationId: req.body.consultationId }, 
				{ $push: {diagnosisList: aDiagnosis._id} },
				{new: true});

			res.status(200).json(aDiagnosis); //HTTP response status codes
		} 
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
	},
	/**
	 * Function that list all diagnosis in the database
	 * @name getAll
	 * @function
	 * @param {Object} req
	 * @param {Object} res - returns the list of diagnosis as a json object
	 */
	getAll: async function (req, res) {
		let diagnosis = await Diagnosis.find().populate("prescriptionList");
		res.status(200).json(diagnosis);
	},
	/**
	 * Function that delete a diagnosis by its id
	 * @name deleteById
	 * @function
	 * @param {Object} req - includes the id of the diagnosis
	 * @param {Object} res - returns the deleted diagnosis as a json object
	 */
	deleteById: async function (req, res) {
		try{
			let diagnosis = await  Diagnosis.findOne({ diagnosisId: req.body.diagnosisId });
            let prescriptionListLength = diagnosis.prescriptionList.length;

			// Remove and delete any prescription related to the diagnosis
			for(let i=0; i < prescriptionListLength; i++){
				let prescriptionId = diagnosis.prescriptionList[diagnosis.prescriptionList.length-1];
				diagnosis.prescriptionList.pop(prescriptionId);
				await Prescription.deleteOne({ _id: prescriptionId });
			}
			await diagnosis.save();

            // Remove and delete the diagnosis related to the patient
			await Patient.updateMany({ patientId: diagnosis.patientId }, { $pull: { diagnosisList: diagnosis._id } });

			// Remove and delete the diagnosis related to the consultation
			await Consultation.updateMany({ consultationId: diagnosis.consultationId }, { $pull: { diagnosisList: diagnosis._id } });

			// Delete the Diagnosis object
			let deleteDiagnosis = await Diagnosis.deleteOne({ _id: diagnosis._id });

			res.status(200).json(deleteDiagnosis);
		}
		catch{
			res.status(400).json({ error: "Invalid Data"});
		}
     },
	/**
	 * Function that update diagnosis information by its id
	 * @name updatDiagnosis
	 * @function
	 * @param {Object} req - includes the id of the diagnosis, and the new diagnosisDescription, diagnosisAdditional
	 * @param {Object} res - returns the status of the update as a json object
	 */
    updateDiagnosis: async function (req, res) {
		console.log("Backend controller update Diagnosis", req.body)
		try{
			let diagnosis = await  Diagnosis.findOneAndUpdate({ diagnosisId: req.body.diagnosisId }, 
				{   diagnosisDescription: req.body.diagnosisDescription, 
                    diagnosisAdditional: req.body.diagnosisAdditional,
                },
				{new: true});
			let status = "";
			// Return the correct status message accordingly
			if(diagnosis  === null){
				status = "ID not found"
			}
			else{
				status = "Diagnosis information updated successfully"
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
