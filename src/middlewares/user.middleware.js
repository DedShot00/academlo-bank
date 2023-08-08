const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  let { accountNumber, receiverUserId, senderUserId } = req.body;

  if (receiverUserId) {
    accountNumber = receiverUserId
  }

  const user = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError(`User: ${accountNumber} can't be found`, 404));
  }
  req.user = user;
  next();
});
