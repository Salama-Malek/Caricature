const contactModel = require("../../models/contactus");


const contactUs = async (req, res, next) => {
    try {
        const newMessage = { ...req.body };
        const message = await contactModel.create(newMessage);
        if (message) {
            return res.status(200).send(message);
        } else {
            return res.status(200).send({ message: "error" });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    contactUs,
}