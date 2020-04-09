const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
