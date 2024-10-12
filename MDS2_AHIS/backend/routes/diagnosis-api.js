/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Configuring RESTFul Endpoints to manage diagnosis
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const diagnosisCont = require("../controllers/diagnosis_controller"); // where the implementation are in 
const router = express.Router();

/**
 * Configuring RESTFul Endpoints
 * - Insert new diagnosis
 * - List all diagnosis
 * - Delete diagnosis by Id
 * - Update diagnosis by Id
 */
router.post("/add", diagnosisCont.addDiagnosis); 
router.get("/list-diagnosis", diagnosisCont.getAll);
router.delete("/delete-diagnosis", diagnosisCont.deleteById);
router.put("/update-diagnosis", diagnosisCont.updateDiagnosis);

/**
 * Export router
 * @exports diagnosisRouterAPI
 */
module.exports = router;
