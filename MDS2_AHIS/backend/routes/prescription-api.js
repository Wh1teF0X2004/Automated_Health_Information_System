/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Configuring RESTFul Endpoints to manage prescription
 */

/**
 * Required Packages from prescription are imported
 * 
 * @constant
 */
const express = require("express");
const prescriptionCont = require("../controllers/prescription_controller");

const router = express.Router();

/**
 * Configuring RESTFul Endpoints to create a new prescription
 * @constant
 */
router.post("/", prescriptionCont.addPrescription);

/**
 * Configuring RESTFul Endpoints to get all prescription
 * @constant
 */
router.get("/", prescriptionCont.getAllPrescription);

/**
 * Configuring RESTFul Endpoints to delete specific prescription by unique prescription ID
 * @constant
 */
router.delete("/", prescriptionCont.deletePrescriptionById);

/**
 * Configuring RESTFul Endpoints to update specific prescription's contents by prescription ID
 * @constant
 */
router.put("/", prescriptionCont.updatePrescription);

/**
 * Exported Express Router
 * 
 * @module router
 * @description This module exports an instance of the Express Router, which is used to define routes and middleware for an Express.js application
 * @returns {object} An instance of the Express Router
 * @exports prescriptionRouterAPI
 */
module.exports = router;