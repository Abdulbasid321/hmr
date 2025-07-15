const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CREATE
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashed, avatar });

    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// READ ALL
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// READ ONE (PROFILE)
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, avatar },
      { new: true }
    ).select('-password');

    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password); 
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET_KEY || "poiuytrewqasdfghjklmnbvcxz", // You should store your secret key in an env variable
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

