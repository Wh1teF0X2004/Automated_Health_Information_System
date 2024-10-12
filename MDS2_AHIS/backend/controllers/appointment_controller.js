/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Controller methods for managing appointment
 */

/**
 * Required Packages from Appointment, Patient, and Physician is imported
 * @constant
 */
const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const Phycisian = require("../models/physician");

/**
 * addAppointment: Create a new appointment
 * getAllAppointment: Get all appointment
 * deleteAppointmentById: Delete specific appointment by unique appointment ID
 * updateAppointment: Update specific appointment's detail by appointment ID
 * 
 * @exports appointmentFunctions
 */
module.exports = {
    /**
     * @name addAppointment - Add a new appointment
     * 
     * @function
     * @async
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    addAppointment: async function (req, res){
        let newAppointment = "";

        newAppointment = new Appointment({
            //appointment_id: req.body.appointment_id,
            physician_id: req.body.physician_id,
            patient_id: req.body.patient_id,
            appointment_venue: req.body.appointment_venue,
            appointment_time: req.body.appointment_time,
            appointment_duration: req.body.appointment_duration
        });

        await newAppointment.save();

        // Add the newly schedule appointment to related patient appointment list
        await  Patient.findOneAndUpdate(
            { patientId: req.body.patient_id }, 
            { $push: {appointmentList: newAppointment._id} },
            {new: true});

        res.status(200).json(newAppointment);
    },

    /**
     * @name  getAllAppointment - Get all Appointment
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    getAllAppointment: async function (req, res){
        let appointment = await Appointment.find({});
        res.status(200).json(appointment);
    },

    /**
     * @name deleteAppointmentById - Delete a specific Appointment by its unique Appointment ID 
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    deleteAppointmentById: async function (req, res){
        let appointmentObj = await Appointment.deleteOne({ appointment_id: req.body.appointment_id }); 

		res.status(200).json(appointmentObj);
    },

    /**
     * @name updateAppointment - Update a specific Appointment details by Appointment ID
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {void}
     */
    updateAppointment: async function (req, res){
        const id = req.body.appointment_id;
        
        const venue = req.body.appointment_venue;
        const appointmentTime = req.body.appointment_time;

        const result = await Appointment.updateOne({ "appointment_id": id }, 
            { $set: {"appointment_venue": venue,
                     "appointment_time": appointmentTime} });

        if (result.nModified === 0) {
            // ID not found
            res.status(404).json({ "status": "ID not found" });
        } else {
            res.status(200).json(result);
        }
    }
};