const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  // role: { type: String, default: 'admin' },
}, { timestamps: true });

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });

  if (admin) {
      const auth = await bcrypt.compare(password, admin.password)
      if (auth) {
          return admin;
      }
      throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

module.exports = mongoose.model('Admin', adminSchema);
