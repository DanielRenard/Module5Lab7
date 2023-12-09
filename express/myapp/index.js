const express = require("express");
const app = express();
// const port = 3000;
// const port2 = 3001;
const ports = [3000, 3001, 3002];

const calculatorRoutes =
require('./routes/calculatorRoutes');

// app.get("/", (req, res) => {
//   res.send("Hi! I'm Paul!");
// });

// app.get("/test", (req, res) => {
//   res.send("Test!");
// });

app.use('/calculator', calculatorRoutes)

app.use('/', express.static('public'))

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// app.listen(port2, () => {
//   console.log(`Example app listening at http://localhost:${port2}`);
// });

ports.forEach((port) => {
  // console.log(port);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});