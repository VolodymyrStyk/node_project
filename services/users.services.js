const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);
const dbPath = path.join(__dirname, '..', 'dataBase', 'users.dataBase.json');
const db = require('../dataBase/users.dataBase.json');

module.exports = {
  findAll: () => db,

  insertUser: (userObject) => {
    db.push(userObject);
    writeFilePromise(dbPath, JSON.stringify(db));

    return db;
  },

  findOneById: (userId) => db[userId],

  deleteUser: (userId) => {
    const deletedUser = db.splice(userId, 1);

    writeFilePromise(dbPath, JSON.stringify(db));

    return deletedUser;
  },

  updateCurrentUser: (userId, body) => {
    db[userId] = body;

    writeFilePromise(dbPath, JSON.stringify(db));

    return db;
  }
};
