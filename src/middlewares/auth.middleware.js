const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
  //todo Extract token from headers and assign it to 'token' variable
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //todo send an error if token doesn't exist
  if (!token) {
    return next(
      new AppError('you are not logged in!, please log in to continue', 401)
    );
  }

  //todo Decode token with jwt
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  //todo search and validate if user exists
  const user = await User.findOne({
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    return next(new AppError('the token owner is not active', 401));
  }

  //todo add active session user to req
  req.currentUser = user;

  next();
});