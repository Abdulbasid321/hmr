const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controller/dashboard.controller');
const { verifyAdminToken } = require('../middleware/auth'); // optional auth middleware

router.get('/summary', verifyAdminToken, getDashboardSummary); // Add auth if needed

module.exports = router;
