const express = require('express');
const app = express();
const userRouter = require('./src/routes/UserRoute');

app.use('/user', userRouter);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});