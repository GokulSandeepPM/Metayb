const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  bikeType: { type: String, required: true },
  assemblyTime: { type: String },
  assembledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  entryDate: { type: Date, default: Date.now },
  assemblyDate: { type: Date },
  underAssembly: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bike', bikeSchema);
