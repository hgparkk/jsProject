const sql = require('./db.js');

const Review = function (review) {
    this.reviewID = review.reviewID;
    this.repu = review.repu;
    this.usersReview = review.usersReview;
    this.userID = review.userID;
    this.code = review.code;
    this.create_at = review.create_at;
}

Review.create = (newReview, result) => {
    sql.query("INSERT INTO review (repu, usersReview, userID, code) VALUES ( ?, ?, ?, ?)", [newReview.repu,newReview.usersReview,newReview.userID,newReview.code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { repu: newReview.repu, ...newReview });
    })
}

Review.findOne = (userID, code, result) => {
    sql.query("SELECT * FROM review WHERE userID = ? AND code = ?", [userID, code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        }
        else {
            result({ kind: "not_found" }, null);
        }
    })
}

Review.findAll= (code, result) => {
    sql.query("SELECT * FROM review WHERE code = ?", [code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(res[0]);
            result(null, res);
        }
        else {
            result({ kind: "not_found" }, null);
        }
    })
}

Review.update = (reviewID, repu, usersReview, result) => {
    sql.query("UPDATE review SET repu = ?, usersReview = ? WHERE reviewID = ?", [repu,usersReview,reviewID],(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows) {
            result(null, res);
        }
        else {
            result({ kind: "not_found" }, null);
        }
    })
}

Review.delete = (reviewID, result) => {
    sql.query("DELETE FROM review WHERE reviewID = ?",[reviewID],(err,res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    })
}

module.exports = Review;