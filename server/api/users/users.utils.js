const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).json({
      errorMessage: 'User not logged in',
      redirectTo: '/login',
      errorCode: 'NOT_LOGGED_IN',
    });
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err)
      return res.status(401).json({
        errorMessage: 'Token not valid',
        redirectTo: '/login?errorMessage=session%20timeout&clearToken=1',
        errorCode: 'TOKEN_NOT_VALID',
      });
    req.user = user;
    next();
  });
}

function generateAccessToken(payload) {
  // expires 2 hrs
  return jwt.sign(payload, process.env.secret, { expiresIn: '7200s' });
}

module.exports = { authenticateToken, generateAccessToken };
