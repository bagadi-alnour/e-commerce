const router = require("express").Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Purchase = require("../../models/Purchase");

//====================================================================
//@route        POST api/purchase/
//@desc         purchase a product
//@access       Private
router.post("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const product = await Product.findById(req.params.id);
    const purchase = new Purchase({
      user: user.id,
      name: product.name,
      price: product.price,
      category: product.category,
      weight: product.weight,
      description: product.description,
      imageUrl: product.imageUrl,
    });

    // await purchase.save();
    return res.json(purchase.name);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error...");
  }
});

//====================================================================
//@route        GET api/purchase/
//@desc         Get all purchased products by user
//@access       Private
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server Error...");
  }
});
module.exports = router;
