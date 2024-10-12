/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Controller methods for managing Prescription
 */

/**
 * Required Packages from Prescription, Patient, and Physician is imported
 * @constant
 */
const Prescription = require("../models/prescription");
const Patient = require("../models/patient");
const Phycisian = require("../models/physician");
const Diagnosis = require("../models/diagnosis");

/**
 * addPrescription: Create a new Prescription
 * getAllPrescription: Get all Prescription
 * deletePrescriptionById: Delete specific Prescription by unique Prescription ID
 * updatePrescription: Update specific Prescription's details by Prescription ID
 * 
 * @exports prescriptionFunctions
 */
module.exports = {
    /**
     * @name addPrescription - Add a new Prescription
     * 
     * @function
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    addPrescription: async function (req, res){
        let newPre = "";
        // let patientObjectId = await Patient.findOne({ patientId: req.body.patient_id }, { _id: 1 });
        // doctorObjectId = await Phycisian.findOne({ patientId: req.body.patient_id }, { _id: 1 });

        newPre = new Prescription({
            prescription_name: req.body.prescription_name,
            patient_id: req.body.patient_id,
            physician_id: req.body.physician_id,
            medication_id: req.body.medication_id,
            diagnosisId: req.body.diagnosisId,
            prescription_dosage: req.body.prescription_dosage,
            prescription_startdate: req.body.prescription_startdate,
            prescription_enddate: req.body.prescription_enddate,
            prescription_freqency: req.body.prescription_freqency,
            prescription_specialinstructions: req.body.prescription_specialinstructions
        });
        await newPre.save();

        // Add the prescription to related diagnosis object consultationList
        await  Diagnosis.findOneAndUpdate(
            { diagnosisId: req.body.diagnosisId }, 
            { $push: {prescriptionList: newPre._id} },
            {new: true});

        res.status(200).json(newPre);
    },

    /**
     * @name getAllPrescription - Get all Prescription
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    getAllPrescription: async function (req, res){
        let prescription = await Prescription.find({});
        res.status(200).json(prescription);
    },

    /**
     * @name deletePrescriptionById - Delete a specific Prescription by its unique Prescription ID 
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    deletePrescriptionById: async function (req, res){
        let prescription = await  Prescription.findOne({ prescription_id: req.body.prescription_id });

         // Remove and delete the consultation related to the patient
		await Diagnosis.updateMany({ diagnosisId: prescription.diagnosisId }, { $pull: { prescriptionList: prescription._id } });

        let prescriptionObj = await Prescription.deleteOne({ prescription_id: req.body.prescription_id }); 

		res.status(200).json(prescriptionObj);
    },

    /**
     * @name updatePrescription - Update a specific prescription's startdate, enddate, frequency, specialinstructions, dosage, and doctors' name by Prescription ID
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    updatePrescription: async function (req, res){
        const id = req.body.prescription_id;

        const physician = req.body.physician_id;
        const frequency = req.body.prescription_freqency;
        const specialinstructions = req.body.prescription_specialinstructions;
        const dosage = req.body.prescription_dosage;

        const result = await Prescription.updateOne({ "prescription_id": id }, 
            { $set: {
                "physician_id": physician,
                "prescription_freqency": frequency,
                "prescription_dosage": dosage,
                "prescription_specialinstructions": specialinstructions
            } });

        if (result.nModified === 0) {
            // ID not found
            res.status(404).json({ "status": "ID not found" });
        } else {
            res.status(200).json(result);
        }
    }
};