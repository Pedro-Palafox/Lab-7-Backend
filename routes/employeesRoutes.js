// routes/countryRoutes.js
const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Rutas para los países
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;