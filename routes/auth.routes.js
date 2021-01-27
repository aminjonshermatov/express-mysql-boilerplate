const { Router } = require("express");

const users = require('../controllers/user.controller');

// const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/register", users.register);

router.post("/login", users.login);

module.exports = router;
