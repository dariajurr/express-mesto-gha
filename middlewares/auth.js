const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.name === 'Unauthorized') {
      next(new AuthorizationError('Необходима авторизация'));
    } else {
      next(err);
    }
  }

  req.user = payload;

  next();
};
