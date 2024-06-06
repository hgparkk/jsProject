const sql = require('./db.js');

const RestInfo = function (restInfo) {
    this.code = restInfo.code;
    this.restName = restInfo.restName;
    this.address = restInfo.address;
    this.cat = restInfo.cat
    this.reviewCount = restInfo.reviewCount
    this.avgRepu = restInfo.avgRepu;
}

RestInfo.search = (params, cat, result) => {
    let query;
    let queryParams = [];

    if (!params || params.trim() === "") {
        query = "SELECT * FROM restInfo"
    } else {
        const arr = params.split(" ");
        const likeClauses = arr.map(word => `(restName LIKE ? OR address LIKE ?)`).join(" OR ");
        query = `SELECT * FROM restInfo WHERE ${likeClauses}`;
        queryParams = arr.flatMap(word => [`%${word}%`, `%${word}%`]);
    }

    if (cat && cat.trim() != "") {
        if (!params || params.trim() === "") {
            query += " WHERE cat = ?";
        } else {
            query += " AND cat = ?";
        }
        queryParams.push(cat);
    }

    query += " ORDER BY avgRepu DESC";

    if (!params || params.trim() === "" || (cat && cat.trim() != "")) {
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