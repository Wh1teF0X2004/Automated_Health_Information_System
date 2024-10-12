/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Controller methods for managing medication
 */

/**
 * Required Packages from medication is imported
 * @constant
 */
const Medication = require("../models/medication");

/**
 * addMedication: Create a new Medication
 * getAllMedication: Get all Medication
 * deleteMedicationById: Delete specific Medication by unique Medication ID
 * updateMedication: Update specific Medication's detail by Medication ID
 * 
 * @exports medicationFunctions
 */
module.exports = {
    /**
     * @name  addMedication - Add a new Medication
     * 
     * @function
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    addMedication: async function (req, res){
        let newMed = "";

        newMed = new Medication({
            //medication_id: req.body.medication_id,
            medicine_name: req.body.medicine_name,
            medication_routeofadmission: req.body.medication_routeofadmission,
            medication_concentration: req.body.medication_concentration,
            medication_volume: req.body.medication_volume
        });

        await newMed.save();
        res.status(200).json(newMed);
    },

    /**
     * @name getAllMedication - Get all Medications
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    getAllMedication: async function (req, res){
        let medication = await Medication.find({});
        res.status(200).json(medication);
    },

    /**
     * @name deleteMedicationById  Delete a specific Medication by its unique Medication ID 
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    deleteMedicationById: async function (req, res){
        let medicationObj = await Medication.deleteOne({ medication_id: req.body.medication_id }); 

		res.status(200).json(medicationObj);
    },

    /**
     * @name updateMedication - Update a specific medication details by medication ID
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    updateMedication: async function (req, res){
        const id = req.body.medication_id;
        
        const routeofadmission = req.body.medication_routeofadmission;

        const result = await Medication.updateOne({ "medication_id": id }, { $set: {"medication_routeofadmission": routeofadmission} });

        if (result.nModified === 0) {
            // ID not found
            res.status(404).json({ "status": "ID not found" });
        } else {
            res.status(200).json(result);
        }
    }
};