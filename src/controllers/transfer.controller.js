const User = require('../models/users.model');
const Transfer = require('../models/trasnfer.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res, next) => {
  //?import user and sender from req and transfer data from req.body
  const { receiver, sender } = req;
  const { amount } = req.body;

  //? send error if sender amount is minor than amount to transfer
  console.log(sender.amount, amount)
  if (sender.amount < amount) {
    return next(new AppError('Insuficient balance',401))
  }

  const prevSenderAmount = sender.amount
  const finalSenderAmount = sender.amount - amount
  const finalRecevierAmount = receiver.amount + amount

  await sender.update({
    amount: finalSenderAmount
  })

  await receiver.update({
    amount: finalRecevierAmount
  })

  const transfer = await Transfer.create({
    amount,
    senderUserId: sender.id,
    receiverUserId: receiver.id
  })

  return res.status(200).json({
    status: 200,
    message: 'successfull transfer',
    sender:{
      id:sender.id,
      name: sender.name,
      'transfer amount': amount,
      'actual amount': sender.amount,
      'previous amount': prevSenderAmount

    }
  });
});
