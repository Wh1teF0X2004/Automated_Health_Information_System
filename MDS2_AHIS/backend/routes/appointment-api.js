/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Configuring RESTFul Endpoints to manage appointment
 */

/**
 * Required Packages from appointment are imported
 * 
 * @constant
 */
const express = require("express");
const appointmentCont = require("../controllers/appointment_controller");

const router = express.Router();

/**
 * Configuring RESTFul Endpoints to create a new Appointment
 * @constant
 */
router.post("/", appointmentCont.addAppointment);

/**
 * Configuring RESTFul Endpoints to get all Appointment
 * @constant
 */
router.get("/", appointmentCont.getAllAppointment);

/**
 * Configuring RESTFul Endpoints to delete specific Appointment by unique Appointment ID
 * @constant
 */
router.delete("/", appointmentCont.deleteAppointmentById);

/**
 * Configuring RESTFul Endpoints to update specific Appointment's contents by Appointment ID
 * @constant
 */
router.put("/", appointmentCont.updateAppointment);

/**
 * Exported Express Router
 * 
 * @module router
 * @description This module exports an instance of the Express Router, which is used to define routes and middleware for an Express.js application
 * @returns {object} An instance of the Express Router
 * @exports appointmentRouterAPI
 */
module.exports = router;