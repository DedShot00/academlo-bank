const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/error.controller');

//* routes
const userRoutes = require('./routes/user.route');
const transferRoutes = require('./routes/transfer.route')

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//todo routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transfer', transferRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler)
console.log(process.env.NODE_ENV);

module.exports = app;
