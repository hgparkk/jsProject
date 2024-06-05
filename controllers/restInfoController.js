const RestInfo = require('../models/restInfoModel');

exports.search = (req, res) => {
    RestInfo.search(req.body.params, req.body.cat, (err, rest) => {
        if(err){
            return res.status(500).send({ message: "Internal server error"});
        }

        return res.status(200).json({ restInfo: rest });
    });
};