const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
console.log('1')
const User = mongoose.model('User', userSchema);
console.log('2')
module.exports = User;

console.log('3')