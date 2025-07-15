// const express = require('express');
// const router = express.Router();
// const adminController = require('../controller/admin.controller');
// const {getCurrentAdminProfile} = require('../controller/admin.controller');
// const {verifyAdminToken} = require('../middleware/middleware'); 

// Admin login route
// router.post('/login', adminController.adminLogin);

// Create a new admin route
// router.post('/create', adminController.createAdmin);

// // Get all admins route
// router.get('/all', adminController.getAllAdmins);

// router.get('/profile', verifyAdminToken, getCurrentAdminProfile);

// // Get a specific admin by ID
// router.get('/:adminId', adminController.getAdmin);

// // Update an admin by ID
// router.put('/:adminId', adminController.updateAdmin);

// // Delete an admin by ID
// router.delete('/:adminId', adminController.deleteAdmin);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin
} = require('../controller/admin.controller');
router.post('/login', adminLogin);
router.post('/', createAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;
