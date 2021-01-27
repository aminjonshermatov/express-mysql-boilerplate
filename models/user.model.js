const sql = require("./db.js");

const User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      return result(err, null);
    }
    console.log(res)
    const { username } = newUser;
    result(null, { id: res.insertId, username });
  });
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      return result(err, null);
    }

    if (res.length) {
      return result(null, res[0]);
    }

    result({ message: "User not found" }, null);
  });
};

module.exports = User;