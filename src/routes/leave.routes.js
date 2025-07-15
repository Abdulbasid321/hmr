const express = require('express');
const router = express.Router();
const ctrl = require('../controller/leave.controller');
const Employee = require('../model/Employee');
const auth = require('../middleware/me'); // Import the middleware

router.get('/', ctrl.getLeaves);
router.post('/', ctrl.createLeave);
router.put('/:id', ctrl.updateLeave);
router.delete('/:id', ctrl.deleteLeave);
// routes/employee.routes.js
// router.get('/', async (req, res) => {
//   const employees = await Employee.find();
//   res.json(employees);
// });

router.get('/me/leaves', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id);
    res.json(employee.leaves); // assuming 'leaves' is part of the schema
  } catch (err) {
    res.status(500).json({ message: 'Failed to get leave summary' });
  }
});

module.exports = router;
