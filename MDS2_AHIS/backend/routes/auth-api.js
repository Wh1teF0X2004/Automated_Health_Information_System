/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Configuring RESTFul Endpoints to manage authentication
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const authCont = require("../controllers/auth_controller"); // where the CRUD implementation are in 
const router = express.Router();

/**
 * Configuring RESTFul Endpoints
 * - Insert new role
 * - List all role
 * - Delete role by Id
 * - Update role by Id
 */
router.post("/register", authCont.register); 
router.post("/login", authCont.login);
router.post("/authenticate", authCont.authenticate);

/**
 * Export router
 * @exports authRouterAPI
 */
module.exports = router;
