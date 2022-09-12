const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
//middlewares
app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());

//routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Error handler
app.use((req, res, next) => {
  const error = new Error("The requested resource doesn't exists.");
  error.status = 404;
  next(error);
});

// Error response & logger
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.',
    },
  });
  console.log('****************************************');
  console.log(error);
  console.log('****************************************');
});

module.exports = app;
