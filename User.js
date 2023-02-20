const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'user name'
  },
  age: Number,
  favoriteFoods: [String],
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'user name'
  },
  age: Number,
  favoriteFoods: [String],
});

const Persons =  mongoose.model('Persons', personSchema);
const User =  mongoose.model('User', userSchema);

module.exports = { Persons, User}
