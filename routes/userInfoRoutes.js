const express = require('express');
const userInfo = require("../controllers/userInfoController");

const router = express.Router();

router.get('/idCompare', userInfo.idCompare);

router.post("/register", userInfo.register);

router.post("/login", userInfo.login);

module.exports = router;
