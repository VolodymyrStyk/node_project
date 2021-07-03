const mongoose = require('mongoose');

const checkIsIdValid = (userId) => (mongoose.Types.ObjectId.isValid(userId));

module.exports = checkIsIdValid;
