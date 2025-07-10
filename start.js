// start.js
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.
on('open', () => {
  console.log('Mogoose connection open');
})
.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const Registration = require('./models/Registration');
const app = require('./app');
const server = app.listen(3000, function() {
  console.log(`Express is running on port ${server.address().port}`);
}); 