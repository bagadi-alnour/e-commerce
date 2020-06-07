const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Prodcut = require("../../models/Product");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//====================================================================
//@route        Get api/user/
//@desc         Login user
//@access       Public
router.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials......." }] });
      }
      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials.." }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        require("../../config/keys").jwt_secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).sned("Sever Error");
    }
  }
);
// Get user info
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).sned("Server Error");
  }
});
router.get("/count", async (req, res) => {
  try {
    const prodcuts = await Prodcut.countDocuments();
    const users = await User.countDocuments();
    const statistic = {
      prodcuts: prodcuts,
      users: users,
    };

    res.json(statistic);
  } catch (err) {
    console.log(err.message);
    res.status(400).sned("Server Error");
  }
});

module.exports = router;
