const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const { errors } = require('celebrate');

// Middlewares
app.use(express.json());  // It parses incoming request with JSON payloads.

// Routes
app.use('/user', routes.userRoute);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(errors());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});