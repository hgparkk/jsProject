const UserInfo = require('../models/userInfoModel');

exports.idCompare = (req, res) => {
    const userID = req.query.userID;

    UserInfo.findOne(userID, (err, user) => {
        if (err) {
            if (err.kind === "not_found"){
                return res.send({message: "User ID is available."});
            } else {
                return res.status(500).send({
                    message: err.message || "Some error occurred while checking the ID."
                });
            }
        }

        return res.status(400).send({
            message: "User ID already exists."
        });
    });
};

exports.register = (req, res)=>{
    const userInfo = new UserInfo({
        userID: req.body.userID,
        userPW: req.body.userPW,
        userName: req.body.userName,
        birth: req.body.birth,
        owner: req.body.owner,
    });
    
    UserInfo.create(userInfo, (err, data)=>{
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the UserInfo."
            });
        } else {
            res.send(data);
        }
    });
};

exports.login = (req, res)=>{
    const userInfo = new UserInfo({
        userID: req.body.userID,
        userPW: req.body.userPW,
        userName: req.body.userName,
        birth: req.body.birth,
        owner: req.body.owner,
    });

    UserInfo.findOne(userInfo.userID,(err,user)=>{
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: "User not found."
                });
            } else {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving user."
                });
            }
        }

        if(userInfo.userPW !== user.userPW) {
            return res.status(401).send({
                message: "Invalid password."
            })
        }

        res.status(200).send({
            userInfo: user,
        });
    });
};