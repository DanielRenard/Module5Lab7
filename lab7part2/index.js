const express = require("express");
const app = express();
// const port = 3000;
// const port2 = 3001;
const ports = [3006, 3007, 3008];

const storeRoutes = require("./routes/storeRoutes")

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );

// app.use("/store", storeRoutes)

app.use('/', express.static('public'))

ports.forEach((port) => {
    // console.log(port);
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });