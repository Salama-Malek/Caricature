const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;
TOKEN_KEY = process.env.TOKEN_KEY;

const adminMiddleware = async function (req, res, next) {
    try {
        const token = req.headers["access-token"];
        if (!token) {
            return res
                .status(403)
                .send({ Message: "A Token Is Required For Authentication" });
        }

        const decoded = jwt.verify(token, TOKEN_KEY);

        if (decoded.is_admin) {
            req.user = decoded;
            return next();
        } else {
            return res.status(404).send({ Message: "Sorry Only Admin Can Access." });
        }

    } catch (error) {
        return res.status(404).send({ Message: "A Token Is Required For Authentication" });
    }
};

module.exports = adminMiddleware;
