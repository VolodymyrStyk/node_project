const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum, userRolesEnum } = require('../constants');

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number,
    default: 17
  },
  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.USER
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('Full Name').get(function() {
  return `${this.name} ${this.email}`;
});

module.exports = model(dataBaseTablesEnum.USER, userSchema);