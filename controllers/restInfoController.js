const RestInfo = require('../models/restInfoModel');

exports.find = (req, res) => {
    RestInfo.findOne(req.body.code, (err, rest) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found review with rest ${req.body.code}.`
                });
            }
            return res.status(500).send({
                message: `Error retrieving review with rest ${req.body.code}.`
            });
        }

        return res.status(200).send({
            restInfo: rest
        });
    })
}

exports.search = (req, res) => {
    RestInfo.search(req.body.params, req.body.cat, (err, rest) => {
        if (err) {
            return res.status(500).send({ message: "Internal server error" });
        }

        const restInfos = rest.map(restInfo => ({
            code: restInfo.code,
            restName: restInfo.restName,
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