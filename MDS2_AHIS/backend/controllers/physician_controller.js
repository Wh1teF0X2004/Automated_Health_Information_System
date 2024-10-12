/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Controller methods for managing Physicians
 */

/**
 * Required Packages from medication is imported
 * @constant
 */
const Physician = require("../models/physician");

/**
 * addPhysician: Create a new Physician
 * getAllPhysician: Get all Physician
 * deletePhysicianById: Delete specific Physician by unique Physician ID
 * updatePhysician: Update specific Physician's detail by Physician ID
 * 
 * @exports physicianFunctions
 */
module.exports = {
    /**
     * @name addPhysician - Add a new Physician
     * 
     * @function
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    addPhysician: async function (req, res){
        let newDoc = "";

        newDoc = new Physician({
            //physician_id: req.body.physician_id,
            medicine_name: req.body.medicine_name,
            physician_firstName: req.body.physician_firstName,
            physician_lastName: req.body.physician_lastName,
            birth_date: req.body.birth_date,
            department: req.body.department
        });

        await newDoc.save();
        res.status(200).json(newDoc);
    },

    /**
     * @name getAllPhysician - Get all Physicians
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    getAllPhysician: async function (req, res){
        let physician = await Physician.find({});
        res.status(200).json(physician);
    },

    /**
     * @name deletePhysicianById - Delete a specific Physician by its unique Physician ID 
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    deletePhysicianById: async function (req, res){
        let physicianObj = await Physician.deleteOne({ physician_id: req.body.physician_id }); 

		res.status(200).json(physicianObj);
    },

    /**
     * @name updatePhysician - Update a specific Physician details by Physician ID
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    updatePhysician: async function (req, res){
        const id = req.body.physician_id;
        
        const newDepartment = req.body.department;

        const result = await Physician.updateOne({ "physician_id": id }, { $set: {"department": newDepartment} });

        if (result.nModified === 0) {
            // ID not found
            res.status(404).json({ "status": "ID not found" });
        } else {
            res.status(200).json(result);
        }
    }
};