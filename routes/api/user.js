const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");
const Product = require("../../models/Product");
const auth = require("../../middleware/auth");
//====================================================================
//@route        Post api/user/
//@desc         Create a User
//@access       Puplic
router.post(
  "/",
  [
    check("username", "username is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, purchase } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({ username, email, password, purchase });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        require("../../config/keys").jwt_secret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Sever Error");
    }
  }
);
// ====================================================================
// @route        GET api/user/
// @desc         Get All users
// @access       Puplic
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
});

// ====================================================================
// @route        Put api/user/purchase
// @desc         Add purchases to user
// @access       Puplic
router.put("/purchase/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const product = await Product.findById(req.params.id);
    user.purchase.unshift(product);
    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).sned("Sever Error");
  }
});
// ====================================================================
// @route        Put api/user/address
// @desc         Add address info
// @access       Private
router.put(
  "/address",
  [
    auth,
    [
      check("country", "country is required").not().isEmpty(),
      check("state", "State is required").not().isEmpty(),
      check("city", "City is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { country, state, city, code, address } = req.body;
    const AddressInfo = { country, state, city, code, address };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      user.address.unshift(AddressInfo);
      await user.save();
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).sned("Sever Error");
    }
  }
);

//====================================================================
//@route        Get api/user/
//@desc         Get  User info
//@access
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).sned("Sever Error");
  }
});
//====================================================================
//@route        Get api/user/
//@desc         Get  User by id
//@access       Private

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).sned("Sever Error");
  }
});

//====================================================================
//@route        PUT api/user/:id
//@desc         Update user information
//@access        private

router.put("/address/update", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { country, state, city, code, address, phone } = req.body;
  const filter = { email: req.body.email };
  const userFields = {};

  userFields.address = {
    country: country,
    state: state,
    city: city,
    code: code,
    address: address,
    phone: phone,
  };
  const user = await User.findOneAndUpdate(filter, userFields, { new: true });
  await user.save();
  res.json(user.address);
  try {
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//====================================================================
//@route        PUT api/user/cart/:id
//@desc         add productsto cart
//@access        private
router.put("/cart/:id", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const product = await Product.findById(req.params.id).populate(
      "name, price, description, _id"
    );

    // cart.unshift(product);
    // await cart.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
//====================================================================
//@route        DELETE api/user/cart/:id
//@desc         Delete product from user Cart
//@access        private

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.cart.remove(req.params.id);
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error....");
  }
});

module.exports = router;
