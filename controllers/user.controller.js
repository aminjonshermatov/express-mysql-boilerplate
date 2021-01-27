const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
      success: false,
    });
  }

  const { firstname, lastname, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({ firstname, lastname, username, password: hashedPassword });

  User.create(user, (err, data) => {
    if (err)
      return res.status(400).send({
        message: err,
        success: false,
      });
    res.status(200).send({ success: true, data });
  });
};

exports.login = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!",
        success: false,
      });
    }
  
    const { username, password } = req.body;
    
    User.findByUsername(username, async (err, user) => {
      if (err) {
        return res.status(400).send({ message: err.message, success: false });
      }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Неверный пароль, попробуйте снова", success: false });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
            },
            SECRET_KEY,
            { expiresIn: 3600 }
        );
        res.status(200).send({ success: true, data: { token } });
    });
  };
