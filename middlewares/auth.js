const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.name === 'Unauthorized') {
      throw new AuthorizationError('Необходима авторизация');
    } else {
      next(err);
    }
  }

  req.user = payload;

  next();
};
