const sql = require('./db.js');

const RestInfo = function (restInfo) {
    this.code = restInfo.code;
    this.restName = restInfo.restName;
    this.address = restInfo.address;
    this.cat = restInfo.cat;
    this.reviewCount = restInfo.reviewCount;
    this.avgRepu = restInfo.avgRepu;
}

RestInfo.findOne = (code, result) => {
    sql.query("SELECT * FROM restInfo WHERE code = ?", [code], (err, res) => {
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

RestInfo.search = (params, cat, result) => {
    let query;
    let queryParams = [];

    if (!params || params.trim() === "") {
        query = "SELECT * FROM restInfo";
    } else {
        const arr = params.split(" ");
        const restNameClauses = arr.map(word => `restName LIKE ?`).join(" AND ");
        const addressClauses = arr.map(word => `address LIKE ?`).join(" OR ");
        
        query = `SELECT * FROM restInfo WHERE (${restNameClauses}) OR (${addressClauses})`;
        queryParams = arr.flatMap(word => [`%${word}%`]).concat(arr.map(word => `%${word}%`));
    }

    if (cat && cat.trim() !== "") {
        if (!params || params.trim() === "") {
            query += " WHERE cat = ?";
        } else {
            query += " AND cat = ?";
        }
        queryParams.push(cat);
    }

    query += " ORDER BY avgRepu DESC";

    if (!params || params.trim() === "" || (cat && cat.trim() !== "")) {
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
};

module.exports = RestInfo;