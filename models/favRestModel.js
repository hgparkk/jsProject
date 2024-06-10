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

FavRest.findAll = (params, userID, result) => {
    let query;
    let queryParams = [];

    if (!params || params.trim() === "") {
        query = "SELECT favRest.favRestID, favRest.userID, restInfo.* FROM favRest JOIN restInfo ON favRest.code = restInfo.code";
    } else {
        const arr = params.split(" ");
        const likeClauses = arr.map(word => `(restName LIKE ? OR address LIKE ?)`).join(" OR ");
        query = `SELECT favRest.favRestID, favRest.userID, restInfo.* FROM favRest JOIN restInfo ON favRest.code = restInfo.code WHERE ${likeClauses}`;
        queryParams = arr.flatMap(word => [`%${word}%`, `%${word}%`]);
    }

    if (query.includes("WHERE")) {
        query += " AND userID = ?";
    } else {
        query += " WHERE userID = ?";
    }
    queryParams.push(userID);

    query += " ORDER BY avgRepu DESC";

    if (!params || params.trim() === "") {
        query += " LIMIT 100";
    }

    sql.query(query, queryParams, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
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