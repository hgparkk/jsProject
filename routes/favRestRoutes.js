const express = require('express');
const favRest = require("../controllers/favRestController");

const router = express.Router();

router.post('/registerFavRest', favRest.registerFavRest);

router.post('/findFavRest', favRest.findFavRest);

router.post('/searchFavRest', favRest.searchFavRest);

router.post('/deleteFavRest', favRest.deleteFavRest);

module.exports = router;