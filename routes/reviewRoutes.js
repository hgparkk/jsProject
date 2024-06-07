const express = require('express');
const review = require("../controllers/reviewController");

const router = express.Router();

router.post('/registerReview', review.registerReview);

router.post('/findReview', review.findReview);

router.post('viewAllReview',review.viewAllReview);

router.post('/updateReview', review.updateReview);

router.post('/deleteReview',review.deleteReview);

module.exports = router;