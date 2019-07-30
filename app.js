const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const allowedOrigins = ["https://app.swaggerhub.com"]
const corsOptions = {
  //origin: 'https://app.swaggerhub.com'
  origin: function (origin, callback) {
    console.log('origin ', origin)
    // if origin is undefined it means we use this on localhost
    if (allowedOrigins.indexOf(origin) !== -1 || !origin || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/networks', require('./routes/networks'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/connections', require('./routes/connections'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;