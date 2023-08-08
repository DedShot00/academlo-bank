const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');
const Transfer = require('../models/trasnfer.model');
const { Op } = require("sequelize");

//todo signup controller
exports.signup = catchAsync(async (req, res, next) => {
  //? import name and passwrod from req.body
  const { name, password } = req.body;
  
  //? generate account number with math.random and give it a lenght of 8 characters
  const randomGeneratedAccount = Math.floor(Math.random() * 100000000);

  //? encrypt password
  const salt = await bcrypt.genSalt(12);
  const encryptedPass = await bcrypt.hash(password, salt);

  //? create user with given data
  const user = await User.create({
    name: name.toLowerCase().trim(),
    accountNumber: randomGeneratedAccount,
    password: encryptedPass,
  });

  //? generate token with JWT
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 200,
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
    },
  });
});


//todo login controller
exports.login = catchAsync(async (req, res, next) => {
  //? import password from req.body and user from req
  const { password } = req.body;
  const { user } = req;

  //? compare password and send error if don't match
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid login credentials', 401));
  }

  //? generate token with JWT
  const token = await generateJWT(user.id)

  //? send success response if everything goes well
  return res.status(200).json({
    status: 'success',
    token,
    user:{
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,  
    },
  });
});

exports.history = catchAsync(async (req, res, next) => { 
  const {id} = req.params

  const trasnferHistory = await Transfer.findAll({
    where:{
      [Op.or]: [{ senderUserId: id }, { receiverUserId: id }],
    }
  })

  if (trasnferHistory.length < 1) {
    return next(new AppError(`There isn't transactions associated to user with id: ${id}`,404))
  }

  return res.status(200).json({
    status:"success",
    message:'Transaccion history retrieved successfully',
    history: trasnferHistory
  })

})