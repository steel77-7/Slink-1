const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

const authgenerator = ( id ) => {
  return jwt.sign(id, JWT_SECRET);
};

module.exports = authgenerator;
