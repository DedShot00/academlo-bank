const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validSender = catchAsync(async (req, res, next) => {
  let { senderUserId } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber: senderUserId,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError(`User: ${senderUserId} can't be found`, 404));
  }
  req.sender = user;
  next();
});

exports.validReceiver = catchAsync(async (req, res, next) => {
  let { receiverUserId } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber: receiverUserId,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError(`User: ${receiverUserId} can't be found`, 404));
  }
  req.receiver = user;
  next();
});
