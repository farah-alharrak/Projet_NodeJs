
var express = require('express')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(400).json({ message: 'no token, access denied' });
  }

  jwt.verify(token, secretJWT, (err, decoded) => {
    if (err) throw err;

    req.user = decoded;
  });

  next();
}

//module.exports = {auth};