const express = require('express');
const restInfo = require("../controllers/restInfoController");

const router = express.Router();

router.post('/search', restInfo.search);

module.exports = router;