const jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
  const { username } = req.body;

  const token = jwt.sign(
    {
      user: {
        username,
      },
    },
    process.env.SECRET,
    { expiresIn: 60 }
  );

  res.json({
    token,
  });
};

exports.restrict = function (req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.status(403).json({
      error: 'Nope :/',
    });
  }

  next();
};

exports.expired = function (req, res, next) {
  const { token } = req.headers;

  try {
    jwt.verify(token, process.env.SECRET);
  } catch ({ message }) {
    return res.status(403).json({
      error: message,
    });
  }

  next();
};

exports.user = function (req, res, next) {
  const { token } = req.headers;
  let user = {};

  try {
    user = jwt.verify(token, process.env.SECRET).user;
  } finally {
    req.user = user;
  }

  next();
};
