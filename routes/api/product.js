const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//====================================================================
//@route        Post api/product/
//@desc         Add a product
//@access       Private
router.post(
  "/",
  [
    auth,
    [
      check("name", " name is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("quantity", "The quantity of product is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      price,
      description,
      category,
      weight,
      imageUrl,
      quantity,
    } = req.body;
    try {
      product = new Product({
        name,
        price,
        description,
        category,
        weight,
        quantity,
        imageUrl,
      });
      await product.save();
      return res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).sned("Sever Error");
    }
  }
);

//====================================================================
//@route        Get api/product/
//@desc         Get all  product
//@access       Prublic
//====================================================================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    return res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error..");
  }
});

//Add product to cart
router.get("/in-cart/ids", async (req, res) => {
  try {
    const products = await Product.find({
      _id: req.params.ids,
    });
    res.json(products);
  } catch (err) {}
});
//====================================================================
//@route        Get api/product/id
//@desc         Get a product by id
//@access       Prublic
//====================================================================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.....");
  }
});

//@route        get api/product/in-cart
//@desc         Find all prodcuts in cart
//@access       Popublc

router.get("/actegory/:category", async (req, res) => {
  try {
    const categoryResults = await Product.find({
      category: req.params.category,
    });
    res.json(categoryResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.....");
  }
});
//@route        Delete api/product/:id
//@desc         Delete a product
//@access       Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);
    res.json({ msg: "Product removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});
//====================================================================
//@route        Get api/product/:name
//@desc         Search Product by name or description
//@access       Public
router.get("/search/:searchKey", async (req, res) => {
  try {
    const products = await Product.find({
      name: new RegExp(req.params.searchKey, "i"),
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});
//====================================================================
//@route        Get api/product/:product_category
//@desc         Search Product by category
//@access       Public
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

//====================================================================
//@route        Get api/product/:product_category
//@desc         Search Product by category
//@access       Public
router.get("/price/:price", async (req, res) => {
  try {
    const products = await Product.find({
      price: { $lte: req.params.price },
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});
router.put("/update", auth, async (req, res) => {
  try {
    const {
      name,
      price,
      weight,
      category,
      quantity,
      description,
      id,
    } = req.body;
    const updateProduct = {
      name,
      price,
      weight,
      category,
      quantity,
      description,
    };
    const felter = { _id: id };
    const update = await Product.findOneAndUpdate(felter, updateProduct, {
      new: true,
    });
    await update.save();
    res.json(update);
  } catch (error) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
