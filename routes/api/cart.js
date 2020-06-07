const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

//====================================================================
//@route        POST api/cart/
//@desc         Add product to users Cart
//@access       Private
router.post("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const productsInCart = await Cart.find({ name: product.name });
    if (productsInCart.length <= 0) {
      const cart = new Cart({
        user: req.user.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        weight: product.weight,
        description: product.description,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
      });
      await cart.save();
      res.json(cart);
    } else {
      res
        .status(400)
        .json({ errors: [{ msg: "You already added this product to Cart" }] });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//====================================================================
//@route        GET api/cart/
//@desc         Get all products from users Cart
//@access       Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let productsInCart = await Cart.find({ user: user.id });

    res.json(productsInCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

//====================================================================
//@route        DELETE api/cart/
//@desc         Delete product from users cart
//@access       Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete(req.params.id);
    res.json({ msg: "Product removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

module.exports = router;
