const FavRest = require('../models/favRestModel');

exports.registerFavRest = (req, res) => {

    const favRest = new FavRest({
        userID: req.body.userID,
        code: req.body.code
    });

    FavRest.create(favRest, (err, data)=> {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the favRest."
            });
        }

        return res.send(data);
    });
};

exports.findFavRest = (req,res) => {
    FavRest.findOne(req.body.userID, req.body.code, (err,favRest) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found favRest with user ${req.body.userID} and rest ${req.body.code}.`
                });
            }
            return res.status(500).send({
                message: `Error retrieving favRest with name ${req.body.userID} and rest ${req.body.code}.`
            });
        } 

        return res.status(200).send({
            favRest: favRest
        });
    })
}

exports.searchFavRest = (req,res) => {
    FavRest.findAll(req.body.userID, (err,favRest) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found favRest with user ${req.body.userID} and rest ${req.body.code}.`
                });
            }
            return res.status(500).send({
                message: `Error retrieving favRest with name ${req.body.userID} and rest ${req.body.code}.`
            });
        } 

        const FavRests = favRest.map(favRest => ({
            favRestID: favRest.favRestID,
            userID: favRest.userID,
            code: favRest.code,
            restName: favRest.restName,
        }));

        return res.status(200).send({
            favRestList: FavRests
        });
    })
}

exports.deleteFavRest = (req,res) => {
    FavRest.delete(req.body.favRestID,(err,favRest)=>{
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found favRest with reviewID ${req.favRestID}.`
                });
            }
            return res.status(500).send({
                message: `Could not delete favRest with reviewID ${req.favRestID}.`
            });
        }
        return res.send({ message: `favRest was deleted successfully!` });
    });
};