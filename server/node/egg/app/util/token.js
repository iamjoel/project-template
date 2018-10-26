const jwt = require('jwt-simple');

const checkToken = function(token, jwtTokenSecret) {
  if (token) {
    try {
      const decoded = jwt.decode(token, jwtTokenSecret);
      if (decoded.account != null && new Date(decoded.exp) > new Date()) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
module.exports.checkToken = checkToken;

const getUserInfoByToken = function(token, jwtTokenSecret) {
  if (token) {
    try {
      const decoded = jwt.decode(token, jwtTokenSecret);
      return decoded;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
module.exports.getUserInfoByToken = getUserInfoByToken;
