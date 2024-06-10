const Review = require('../models/reviewModel');

exports.registerReview = (req, res) => {

    const review = new Review({
        repu: req.body.repu,
        usersReview: req.body.usersReview,
        userID: req.body.userID,
        code: req.body.code
    });

    Review.create(review, (err, data)=> {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the review."
            });
        }
        return res.send(data);
    });
};

exports.findReview = (req, res) => {
    Review.findOne(req.body.userID, req.body.code, (err, review) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found review with user ${req.body.userID} and rest ${req.body.code}.`
                });
            }
            return res.status(500).send({
                message: `Error retrieving review with name ${req.body.userID} and rest ${req.body.code}.`
            });
        } 

        return res.status(200).send({
            review: review
        });
    });
};

exports.viewAllReview = (req,res) => {
    Review.findAll(req.body.code, (err,review) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found review with user ${req.body.userID} and rest ${req.body.code}.`
                });
            }
            return res.status(500).send({
                message: `Error retrieving review with name ${req.body.userID} and rest ${req.body.code}.`
            });
        } 

        const Reviews = review.map(review => ({
            reviewID: review.reviewID,
            repu: review.repu,
            usersReview: review.usersReview,
            userID: review.userID,
            code: review.code,
            created_at: review.created_at
        }));

        return res.status(200).send({
            reviewList: Reviews
        });
    })
}

exports.updateReview = (req,res) => {
    Review.update(req.body.reviewID,req.body.repu,req.body.usersReview,(err,review)=>{
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found review with ID ${req.body.reviewID}`
                });
            } else {
                return res.status(500).send({
                    message: `Could not update review for review with ID ${req.body.reviewID}.`
                });
            }
        }
        return res.send({ message: "Review updated successfully!" });
    })
}

exports.deleteReview = (req,res) => {
    Review.delete(req.body.reviewID,(err,review)=>{
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found review with reviewID ${req.reviewID}.`
                });
            }
            return res.status(500).send({
                message: `Could not delete review with reviewID ${req.reviewID}.`
            });
        }
        return res.send({ message: `review was deleted successfully!` });
    })
}