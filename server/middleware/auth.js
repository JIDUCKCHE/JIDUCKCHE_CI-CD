const { User } = require('../models/User');

const auth = (req, res, next) => {
  const token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err || !user) {
      return res.json({
        isAuth: false,
        error: true
      });
    }

    req.token = token;
    req.user = user;

    next()
  });
};

module.exports = { auth };
