/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Configuring RESTFul Endpoints to manage medication
 */

/**
 * Required Packages from medication are imported
 * 
 * @constant
 */
const express = require("express");
const medicationCont = require("../controllers/medication_controller");

const router = express.Router();

/**
 * Configuring RESTFul Endpoints to create a new Medication
 * @constant
 */
router.post("/", medicationCont.addMedication);

/**
 * Configuring RESTFul Endpoints to get all Medication
 * @constant
 */
router.get("/", medicationCont.getAllMedication);

/**
 * Configuring RESTFul Endpoints to delete specific Medication by unique Medication ID
 * @constant
 */
router.delete("/", medicationCont.deleteMedicationById);

/**
 * Configuring RESTFul Endpoints to update specific Medication's contents by Medication ID
 * @constant
 */
router.put("/", medicationCont.updateMedication);

/**
 * Exported Express Router
 * 
 * @module router
 * @description This module exports an instance of the Express Router, which is used to define routes and middleware for an Express.js application
 * @returns {object} An instance of the Express Router
 * @exports medicationRouterAPI
 */
module.exports = router;