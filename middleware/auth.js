const constants = require('../config/constants');

function authOnly(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Es necesario iniciar sesión';
    res.redirect(constants.LOGIN_URL);
  }
}

module.exports = {
  authOnly,
};
