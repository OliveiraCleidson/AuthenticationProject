const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const { errors } = require('celebrate');
const passport = require('passport');
// Middlewares
app.use(express.json());  // It parses incoming request with JSON payloads.
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/user', routes.userRoute);

app.use(errors());

app.listen(3000, function () {
  console.log('Authentication API');
});