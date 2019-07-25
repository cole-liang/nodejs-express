const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Node');
});

app.listen(port, () => {
  console.log(`server start listening at ${port}`);
});
