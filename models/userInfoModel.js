const sql = require('./db.js');

const UserInfo = function (userInfo) {
    this.userID = userInfo.userID;
    this.userPW = userInfo.userPW;
    this.userName = userInfo.userName;
    this.birth = userInfo.birth;
}

UserInfo.create = (newUserInfo, result) => {
    sql.query("INSERT INTO userInfo SET ?", newUserInfo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { userID: newUserInfo.userID, ...newUserInfo });
    })
}

UserInfo.findOne = (userID, result) => {
    sql.query("SELECT * FROM userInfo WHERE userID = ?", [userID], (err, res) => {
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

UserInfo.findID = (userName, birth, result) => {
    sql.query("SELECT userID FROM userInfo WHERE userName = ? AND birth = ?", [userName, birth], (err, res) => {
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

UserInfo.resetPWinfo = (userID, userName, birth, result) => {
    sql.query("SELECT * FROM userInfo WHERE userID = ? AND userName = ? AND birth = ?", [userID, userName, birth], (err, res) => {
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

UserInfo.resetPW = (userID, userName, birth, newPW, result) => {
    sql.query("UPDATE userInfo SET userPW = ? WHERE userID = ? AND userName = ? AND birth = ?", [newPW, userID, userName, birth], (err, res) => {
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

UserInfo.delete = (userID, result) => {
    sql.query("DELETE FROM userInfo WHERE userID = ?", [userID], (err, res) => {
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

module.exports = UserInfo;