const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // https://github.com/emerleite/node-gravatar
const bcrypt = require("bcryptjs"); // https://www.npmjs.com/package/bcryptjs

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
  const user = await User.findOne({ email: req.body.email });

  // 중복된 아이디가 있다면 400 상태를 보낸다.
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
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
        if (err) throw err;
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
