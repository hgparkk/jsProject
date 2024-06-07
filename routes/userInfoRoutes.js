const express = require('express');
const userInfo = require("../controllers/userInfoController");

const router = express.Router();

router.post('/compareID', userInfo.compareID);

router.post("/register", userInfo.register);

router.post("/login", userInfo.login);

router.post("/findID", userInfo.findID);

router.post("/checkChangePW", userInfo.checkChangePW);

router.post("/changePW", userInfo.changePW);

router.post("/resign", userInfo.resign);

module.exports = router;
