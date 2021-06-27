const fs = require('fs');
const util = require('util');
const path = require('path');
const db = require('../dataBase/users.dataBase.json');

const writeFilePromise = util.promisify(fs.writeFile);
const dbPath = path.join(__dirname, '..', 'dataBase', 'users.dataBase.json');

module.exports = {
  registerNewUser: (body) => {
    db.push(body);
    writeFilePromise(dbPath, JSON.stringify(db));

    return db;
  }
};
