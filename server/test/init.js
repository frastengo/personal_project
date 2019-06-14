const massive = require("massive");
require("dotenv").config();

const TEST_CONNECTION_STRING = 
'postgres://spcbvzzwtekzni:b96608c1edb5abb287a81f127cfd381c0d1607081312570235746871423bea1a@ec2-107-20-230-70.compute-1.amazonaws.com:5432/d74kad3v5ls5hg?ssl=true'

let dbPromise;

module.exports = {
  initDb() {
    
    if (!dbPromise) {
      dbPromise = massive(TEST_CONNECTION_STRING);
    }
    return dbPromise;
  }
};
