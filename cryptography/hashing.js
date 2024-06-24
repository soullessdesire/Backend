const bcrypt = require('bcrypt');

const hashing = async (password) => {
  return await bcrypt.hash(password, 10) 
}

module.exports = hashing;