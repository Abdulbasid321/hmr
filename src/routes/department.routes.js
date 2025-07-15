const express = require('express');
const router = express.Router();
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controller/department.controller');

// GET all departments
router.get('/', getDepartments);

// POST a new department
router.post('/', createDepartment);

// PUT (update) a department by ID
router.put('/:id', updateDepartment);

// DELETE a department by ID
router.delete('/:id', deleteDepartment);

module.exports = router;
