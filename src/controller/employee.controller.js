const jwt = require('jsonwebtoken');
const Employee = require('../model/Employee');


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports.updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports.employeeLogin = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const employee = await Employee.login(email, phone); 
    const token = jwt.sign(
      { adminId: employee._id, email: employee.email },
      process.env.JWT_SECRET_KEY || "poiuytrewqasdfghjklmnbvcxz", // You should store your secret key in an env variable
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    res.status(200).json({ employee, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
