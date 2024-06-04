const UserInfo = require('../models/userInfoModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';

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

    const hash = crypto.createHash('sha256');   
    const userPW = hash.update(req.body.userPW).digest('hex');

    const userInfo = new UserInfo({
        userID: req.body.userID,
        userPW: userPW,
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

    const hash = crypto.createHash('sha256');
    const userPW = hash.update(req.body.userPW).digest('hex');

    UserInfo.findOne(req.body.userID,(err,user)=>{
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