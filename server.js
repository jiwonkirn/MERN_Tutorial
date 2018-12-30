const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
// extended 는 중첩된 객체표현을 허용할지 말지를 정하는 것이다. 객체 안에 객체를 파싱할 수 있게하려면 true.
// 내부적으로 true 를 하면 qs 모듈을 사용하고, false 면 query-string 모듈을 사용한다. 이 두 모듈간의 차이에서 중첩객체 파싱여부가 갈린다.
// 관련 stack-overflow link: https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
app.use(bodyParser.urlencoded({ extended: false }));

// req.body는 body-parser를 사용하기 전에는 default가 Undefined이다.
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(e => console.log("error!", e));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
