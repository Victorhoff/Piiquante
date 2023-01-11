const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  manufacturer: {type: String, require: true},
  description: {type: String, require: true},
  mainPepper: {type: String, require: true},
  imageUrl: {type: String, require: true},
  heat: {type: Number, require: true},
  likes: {type: Number, require: true},
  dislikes: {type: Number, require: true},
  usersLiked: {type: ["String <userId>"], require: true},
  usersDisliked: {type: ["String <userId>"], require: true},

});

module.exports = mongoose.model('Sauce', sauceSchema);