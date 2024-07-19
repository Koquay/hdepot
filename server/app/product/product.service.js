require("./product.model");
const Product = require("mongoose").model("Product");

exports.getTopPicks = async (req, res) => {
    console.log("ProductService.getTopPicks");
  
    const type = req.query.type.toLowerCase();
    console.log("type", type);

    let products;
  
    try {
      if(type === 'all') {
        products = await Product.find({ topPick: true });
      }else {
        products = await Product.find({ topPick: true, type });
      }
      
      console.log("products", products);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Problem getting products.");
    }
  };