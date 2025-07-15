const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  // model/Employee.js
leaves: [
  {
    type: { type: String, required: true },
    total: { type: Number, required: true },
    used: { type: Number, required: true }
  }
]

}, { timestamps: true });


employeeSchema.statics.login = async function (email, phone) {
  const employee = await this.findOne({ email });

  if (employee) {
    if (phone === employee.phone) {
      return employee;
    }
    throw Error('Incorrect password');
  }

  throw Error('Incorrect email');
};

module.exports = mongoose.model('Employee', employeeSchema);
  