const { set } = require("mongoose");
const React = require("../../models/user.caricature.react");
const Caricature = require("../../models/caricature");


const createFavouriteCaricature = async (req, res, next) => {

    try {
        const caricature_id = req.params.caricatureid;
        const user_id = req.params.id;
        const react = req.body.react;

        const existFav = await React.findOne({ userId: user_id, caricatureId: caricature_id })

        if (existFav) {
            const existFav = await React.updateOne({ userId: user_id, caricatureId: caricature_id }, { react: req.body.react })
            return res.status(200).send({ message: `Favourite Updated ${react}`, fav: existFav });
        }

        const newReact = {
            userId: user_id,
            caricatureId: caricature_id,
            react: react
        };
        const fav = await React.create(newReact);
        if (fav) {
            return res.status(200).send({ message: "Favourite Added Successfully", fav: fav });
        } else {
            return res.status(200).send({ message: "Internal Server Error" });
        }
    } catch (err) {
        next(err);
    }
};


const profile = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const existFav = await React.find({ userId: user_id, react: true });
        const existFav_caricature_id = existFav.map((el) => el.caricatureId);

        let caricature_store = [];
        let caricatures = [];

        for (let i = 0; i < existFav_caricature_id.length; i++) {
            let caricature_id = existFav_caricature_id[i];
            caricature_store = (await Caricature.find({ _id: caricature_id })
                .populate('authorName')
                .populate('artistName')
                .populate('characterName')
            );
            if (caricature_store[0] !== undefined) {
                caricatures.push(caricature_store[0]);
            }
        }

        if (caricatures.length != 0) {
            return res.status(200).send(caricatures);
        } else {
            return res.status(200).send([]);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createFavouriteCaricature,
    profile,
}