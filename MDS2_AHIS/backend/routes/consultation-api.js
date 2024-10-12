/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Configuring RESTFul Endpoints to manage consultation
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const consultationCont = require("../controllers/consultation_controller"); // where the implementation are in 
const router = express.Router();

/**
 * Configuring RESTFul Endpoints
 * - Insert new consultation
 * - List all consultation
 * - Delete consultation by Id
 * - Update consultation by Id
 */
router.post("/add", consultationCont.addConsultation); 
router.get("/list-consultation", consultationCont.getAll);
router.delete("/delete-consultation", consultationCont.deleteById);
router.put("/update-consultation", consultationCont.updateConsultation);

/**
 * Export router
 * @exports consultationRouterAPI
 */
module.exports = router;
