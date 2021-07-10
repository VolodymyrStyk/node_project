const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum, userRolesEnum } = require('../constants');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 17,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.USER
  },
  activate: {
    type: Boolean,
    default: false
  },
  mailToken: {
    type: String
  },
  avatar: {
    type: String
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('Full Name').get(function() {
  return `${this.name} ${this.email}`;
});

module.exports = model(dataBaseTablesEnum.USER, userSchema);
