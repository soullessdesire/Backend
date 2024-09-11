const express = require("express");
const router = express.Router();
const login = require("../controllers/Login/login");
const auth = require("../authFuncs/auth");

router.post("/login", login);
router.post("/auth", auth);

module.exports = router;
