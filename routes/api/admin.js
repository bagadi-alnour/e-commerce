const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//====================================================================
//@route        Post api/admin/
//@desc         Create a user
//@access       Puplic
router.post(
  "/",
  [
    auth,
    [
      check("name", "First name is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin is already exists" }] });
      }
      admin = new Admin({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        require("../../config/keys").jwt_secret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).sned("Sever Error");
    }
  }
);
module.exports = router;
