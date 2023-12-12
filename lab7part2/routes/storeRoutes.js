const express = require("express");
const storeController = require('../controller/storeController')
const router = express.Router();

router.get("/products", (req, res) => {
  console.log(req.query)
  storeController.getProducts(req, res)
})

module.exports = router