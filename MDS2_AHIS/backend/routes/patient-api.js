/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Configuring RESTFul Endpoints to manage patients
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const patientCont = require("../controllers/patient-controller"); // where the implementation are in 
const router = express.Router();

/**
 * Configuring RESTFul Endpoints
 * - Insert new patient
 * - List all patient
 * - Delete patient by Id
 * - Update patient adress, marital status, email and tel by Id
 */
router.post("/add", patientCont.addPatient); 
router.get("/list-patients", patientCont.getAll);
router.delete("/delete-patient", patientCont.deleteById);
router.put("/update-patient", patientCont.updatePatient);

/**
 * Export router
 * @exports patientRouterAPI
 */
module.exports = router;
