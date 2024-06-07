const sql = require('./db.js');

const FavRest = function (favRest) {
    this.favRestID = favRest.favRestID;
    this.userID = favRest.userID;
    this.code = favRest.code;
}

FavRest.create = (newFavRest, result) => {
    sql.query("INSERT INTO favRest (userID, code) VALUES ( ?, ?)", [newFavRest.userID, newFavRest.code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { favRestID: res.favRestID, ...newFavRest });
    })
};

FavRest.findOne = (userID, code, result) => {
    sql.query("SELECT * FROM favRest WHERE userID = ? AND code = ?", [userID, code], (err, res) => {
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

FavRest.findAll = (userID, result) => {
    sql.query("SELECT favRest.favRestID, favRest.userID, favRest.code, restInfo.restName FROM favRest JOIN restInfo ON favRest.code = restInfo.code WHERE userID = ?", [userID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
        }
        else {
            result({ kind: "not_found" }, null);
        }
    })
}

FavRest.delete = (favRestID, result) => {
    sql.query("DELETE FROM favRest WHERE favRestID = ?",[favRestID],(err,res) =>{
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

module.exports = FavRest;