/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Configuring RESTFul Endpoints to manage roles
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const roleCont = require("../controllers/role_controller"); // where the CRUD implementation are in 
const router = express.Router();

/**
 * Configuring RESTFul Endpoints
 * - Insert new role
 * - List all role
 * - Delete role by Id
 * - Update role by Id
 */
router.post("/add", roleCont.addRole); 
router.get("/list-roles", roleCont.getAll);
router.delete("/delete-role", roleCont.deleteById);
router.put("/update-role", roleCont.updateRole);

/**
 * Export router
 * @exports roleRouterAPI
 */
module.exports = router;
