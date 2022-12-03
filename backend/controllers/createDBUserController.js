const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createuser = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    if (!name && !email && !password) {
      res.status(200).send("email and password fields are required");
    } else {
      const userexists = await usermodel.findOne({ email: email });
      if (userexists) {
        res.status(200).send("user already exists");
      } else {
        const encryptpwd = await bcrypt.hash(password, 10);
        const user = await usermodel.create({
          name:name,
          email: email,
          password: encryptpwd,
        });
        const token = jwt.sign({ email: email, id: user._id }, "shhhhh", {
          expiresIn: "2h",
        });
        user.token = token;
        user.password = undefined;
        res.status(200).send(user);
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error.message));
    res.status(201).send("createuser failed");
  }
};

module.exports = createuser;
