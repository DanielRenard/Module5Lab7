const axios = require('axios')

const getProducts = async (req, res) => {
    await axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      // console.log(response)
      res.status(200).json(response.data);
    })
};

module.exports = { getProducts }