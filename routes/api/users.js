const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // https://github.com/emerleite/node-gravatar
const bcrypt = require("bcryptjs"); // https://www.npmjs.com/package/bcryptjs
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/test
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });

  // 중복된 아이디가 있다면 400 상태를 보낸다.
  if (user) {
    errors.email = "Email already exists";
    return res.status(400).json(errors);
  } else {
    // 중복된 아이디가 없다면
    // 아바타를 생성한다.
    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });

    // 새로운 document를 생성한다.
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    // 패스워드를 해싱한다.
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        // 에러가 나지 않는다면 password에 해싱된 String을 덮어씌운다.
        newUser.password = hash;
        // document를 저장하고 저장한 결과값에 대한 json응답을 한다.
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(e => console.log(e));
      });
    });
  }
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  const user = await User.findOne({ email });

  // Check for user
  if (!user) {
    errors.email = "Email not found";
    return res.status(404).json(errors);
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    // UserMatched
    const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

    // Sign Token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  } else {
    errors.password = "Password incorrect";
    return res.status(400).json(errors);
  }
});

// @route   GET api/users/current
// @desc    Return Current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

// postman POST
/* req json
{
	"name": "jiwonkim3",
	"email": "kjw1925@daum.com",
	"password": "my37261925"
}
*/
/* res json
{
    "_id": "5c28b52294bdfc5849d4c683", // mongodb's make id automatically
    "name": "jiwonkim3",
    "email": "kjw1925@daum.com",
    "avatar": "//www.gravatar.com/avatar/48607baf97b5bcc956bb36c91e746812?s=200&r=pg&d=mm", // gravatar module
    "password": "$2a$10$Gzbj0jP0U3d3V2w4ye8ckeV2dD6o.iMrzYObIsf6KvRjX5CT5ulcm", // hashed password was made by bcrypt module
    "date": "2018-12-30T12:08:02.072Z",
    "__v": 0
}
*/
