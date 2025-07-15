const Leave = require('../model/Leave');

exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId', 'name email');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
