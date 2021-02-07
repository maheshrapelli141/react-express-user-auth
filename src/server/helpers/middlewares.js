const config = require('../../config');
const jwt = require('jsonwebtoken');
const Users = require('../users/user.model');

const isAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
        config.JWT.secret,
        async (error, decoded) => {
          if (error)
            return res
              .status(403)
              .json({ status: 'error', message: error.message })
              .end();

          if (decoded._id) {
            await Users.findById(
              decoded._id
            ).then(async (user, error) => {
              if (error)
                return res
                  .status(500)
                  .send({ status: 'error', message: error.message });
              /** if user is not found using @JWT , then do not create a new user, just throw error */
              if (!user)
                return res.json({
                  status: 'error',
                  message: 'Unable to find User',
                });
              else {
                req.user = {
                  _id: user._id,
                  email: user.email
                };
                next();
              }
            });
          } else
            return res
              .status(404)
              .json({ status: 'error', message: 'Unable To Find User' });
        }
      );
    } else
      return res
        .status(403)
        .json({
          status: 'error',
          message: 'UnAuthenticated',
          message: 'Header Is Not Present In The Request',
        });
    // return next({ status: 401, message: 'UnAuthenticated', head: 'Header is Not Present In The Request' });
  } catch (e) {
    return res.json({ status: 'error', message: e.message });
  }
};


module.exports = {
  isAuth
}