const jwt = require('jsonwebtoken');
const Employee = require('../model/Employee');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, 'poiuytrewqasdfghjklmnbvcxz');
    
    // 🔧 use adminId instead of id
    const employee = await Employee.findById(decoded.adminId).select('name position department joinDate email');

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    req.user = employee;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
