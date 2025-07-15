// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const empCtrl = require('../controller/employee.controller');
const auth = require('../middleware/me'); // Import the middleware

router.get('/', empCtrl.getAllEmployees);
router.post('/', empCtrl.createEmployee);
// router.put('/:id', empCtrl.updateEmployee);
router.delete('/:id', empCtrl.deleteEmployee);
router.post('/login', empCtrl.employeeLogin);
router.get('/me', auth, (req, res) => {
  res.json(req.user); // This is the logged-in employee
});
router.put('/me', auth, empCtrl.updateMyProfile); // Add this line under /me route


// router.get('/me', auth, async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.user.adminId).select('name position department joinDate');
//     if (!employee) return res.status(404).json({ error: 'Employee not found' });

//     res.status(200).json(employee);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;



