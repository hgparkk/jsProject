const sql = require('./db.js');

const UserInfo = function(userInfo){
    this.userID = userInfo.userID;
    this.userPW = userInfo.userPW;
    this.userName = userInfo.userName;
    this.birth = userInfo.birth;
    this.owner = userInfo.owner;
}

UserInfo.create = (newUserInfo, result) => {
    sql.query("INSERT INTO userInfo SET ?", newUserInfo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("create userInfo: ", {userID:newUserInfo.userID,...newUserInfo});
        result(null, {userID:newUserInfo.userID,...newUserInfo});
    });
}

UserInfo.findOne = (userID, result) => {
    sql.query("SELECT userID FROM userInfo WHERE userID = ?", [userID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length){
            console.log("read userInfo: ", res[0]);
            result(null,res[0]);
        }
        else
        {
            console.log("not_found");
            result({kind:"not_found"},null);
        }
    });
}

module.exports = UserInfo;