const mongoose = require('mongoose');

// Define the schema for registration
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, 
  },
  email: {
    type: String,
    trim: true, 
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
