'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const charactersRouter = require('./routes/characters');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const genresRouter = require('./routes/genres');
const { ERRORS } = require('./constants/errors');

const app = express();
//middlewares
app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());

//routes
app.use('/api/auth', authRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);

// Error handler
app.use((req, res, next) => {
  next(ERRORS.NOT_FOUND);
});

// Error response & logger
app.use((error, req, res, next) => {
  const status = error.status || ERRORS.INTERNAL_SERVER_ERROR.status;
  const message = error.message || ERRORS.INTERNAL_SERVER_ERROR.message;
  res.status(status).send({
    error: {
      status,
      message,
    },
  });
  console.log('****************************************');
  console.log(error);
  console.log('****************************************');
});

module.exports = app;
