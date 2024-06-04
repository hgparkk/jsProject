const UserInfo = require('../models/userInfoModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';

exports.compareID = (req, res) => {
    const userID = req.body.userID;

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

    const hash = crypto.createHash('sha256');   
    const userPW = hash.update(req.body.userPW).digest('hex');

    const userInfo = new UserInfo({
        userID: req.body.userID,
        userPW: userPW,
        userName: req.body.userName,
        birth: req.body.birth
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
    const userID = req.body.userID;
    const hash = crypto.createHash('sha256');
    const userPW = hash.update(req.body.userPW).digest('hex');

    UserInfo.findOne(userID,(err,user)=>{
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

        if(userPW !== user.userPW) {
            return res.status(401).send({
                message: "Invalid password."
            })
        }

        const token = jwt.sign({ id: user.userID }, secretKey, {
            expiresIn: 86400
        });

        res.status(200).send({
            userInfo: user,
            token: token
        });
    });
};

exports.findID = (req, res) => {
    UserInfo.findID(req.body.userName, req.body.birth, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with name ${req.body.userName} and birth ${req.body.birth}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with name ${req.body.userName} and birth ${req.body.birth}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.checkChangePW = (req, res) => {
    UserInfo.resetPWinfo(req.body.userID, req.body.userName, req.body.birth, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: "User ID not found." });
            } else {
                return res.status(500).send({
                    message: err.message || "Some error occurred while checking the ID."
                });
            }
        }

        return res.status(200).send({
            message: "success",
            data: data
        });
    })
}

exports.changePW = (req, res) => {
    const hash = crypto.createHash('sha256');
    const newPW = hash.update(req.body.userPW).digest('hex');
    UserInfo.resetPW(req.body.userID, req.body.userName, req.body.birth, newPW, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with ID ${req.body.userID}, name ${req.body.userName}, and birth ${req.body.birth}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not update password for User with ID ${req.body.userID}.`
                });
            }
        } else {
            res.send({ message: "Password updated successfully!" });
        }
    });
};

exports.resign = (req,res)=>{
    UserInfo.delete(req.body.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with userID ${userID}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete User with userID ${userID}.`
                });
            }
        } else {
            res.send({ message: `User was deleted successfully!` });
        }
    });
}