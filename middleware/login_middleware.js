const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;
const TOKEN_KEY = process.env.TOKEN_KEY;

const loginMiddleware = async function (req, res, next) {
    const token = req.headers["access-token"];
    if (!token) {
        return res
            .status(403)
            .send({ Message: "A Token Is Required For Authentication" });
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const user = await userModel.findById(decoded.user_id);

        console.log(user);
        if (!user.is_admin) {
            req.user = user;
            return next();
        } else {
            return res.status(400).send({ Message: "Wrong password possibility" });
        }
    } catch (err) {
        return res.status(401).send({ Message: "Invalid Token" });
    }
};

module.exports = loginMiddleware;
