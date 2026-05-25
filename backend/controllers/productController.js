const getProducts = (req, res) => {
  res.json({
    message: "Products fetched successfully"
  });
};

module.exports = {
  getProducts
};