const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const oAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTablesEnum.USER
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthSchema.pre('findOne', function() {
  this.populate('user_id');
});

oAuthSchema.pre('create', function() {
  this.populate('user_id');
});

oAuthSchema.pre('findOneAndDelete', function() {
  this.populate('user_id');
});

module.exports = model(dataBaseTablesEnum.O_AUTH, oAuthSchema);
