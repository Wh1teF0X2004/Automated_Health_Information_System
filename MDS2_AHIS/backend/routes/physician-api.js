/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Configuring RESTFul Endpoints to manage Physician
 */

/**
 * Required Packages from Physician are imported
 * 
 * @constant
 */
const express = require("express");
const physicianCont = require("../controllers/physician_controller");

const router = express.Router();

/**
 * Configuring RESTFul Endpoints to create a new Physician
 * @constant
 */
router.post("/", physicianCont.addPhysician);

/**
 * Configuring RESTFul Endpoints to get all Physician
 * @constant
 */
router.get("/", physicianCont.getAllPhysician);

/**
 * Configuring RESTFul Endpoints to delete specific Physician by unique Physician ID
 * @constant
 */
router.delete("/", physicianCont.deletePhysicianById);

/**
 * Configuring RESTFul Endpoints to update specific Physician's contents by Physician ID
 * @constant
 */
router.put("/", physicianCont.updatePhysician);

/**
 * Exported Express Router
 * 
 * @module router
 * @description This module exports an instance of the Express Router, which is used to define routes and middleware for an Express.js application
 * @returns {object} An instance of the Express Router
 * @exports physicianRouterAPI
 */
module.exports = router;