const RestInfo = require('../models/restInfoModel');

exports.search = (req, res) => {
    RestInfo.search(req.body.params, req.body.cat, (err, rest) => {
        if (err) {
            return res.status(500).send({ message: "Internal server error" });
        }

        const restInfos = rest.map(restInfo => ({
            code: restInfo.code,
            restName: restInfo.restname,
            address: restInfo.address,
            cat: restInfo.cat,
            reviewCount: restInfo.reviewCount,
            avgRepu: restInfo.avgRepu
        }));

        return res.status(200).send({
            restInfoList: restInfos
        });
    });
};