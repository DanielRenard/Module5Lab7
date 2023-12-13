const express = require("express");
const app = express();
const ports = [3007];

const storeRoutes = require("./routes/storeRoutes")
const cors = require("cors")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(cors())

app.use("/store", storeRoutes)

app.use('/', express.static('public'))

ports.forEach((port) => {
    // console.log(port);
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });