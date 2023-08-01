const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ADMIN_TOKEN_KEY = process.env.ADMIN_TOKEN_KEY;
const TOKEN_KEY = process.env.TOKEN_KEY;
const userModel = require("../../models/user");


const login = async (req, res) => {
    //return res.send(req.headers);
    try {
        const { email, password } = req.body;
        //validation for user mail and password
        if (!(email && password)) {
            res.status(400).send({ Message: "All input are required" });
        }
        // Validate if user exist in our database
        const user = await userModel.findOne({ email });

        if (user == null) {
            return res.status(404).send({ Message: "User not found" });
        }

        if (user == null) {
            return res.status(404).send({ Message: "Please confirm E-mail before login" });
        }


        const comparePasswords = await bcrypt.compare(password, user.password);

        if (user && comparePasswords) {
            // Create token
            let token;
            // if (user.is_admin) {
            token = jwt.sign(
                {
                    user_id: user._id,
                    email,
                    name: user.name,
                    image: user.image,
                    is_admin: user.is_admin,
                },
                TOKEN_KEY
            );
            //  } 
            //else {
            //     token = jwt.sign(
            //         {
            //             user_id: user._id,
            //             email,
            //             name: user.name,
            //             image: user.image,
            //             is_admin: user.is_admin,
            //         },
            //         USER_TOKEN_KEY
            //     );
            // }
            user.token = token;
            return res.status(200).send({
                Message: "success",
                token: user.token,
                is_admin: user.is_admin,
            });
        } else {
            return res.status(400).send({ Message: "Wrong email or password" });
        }
    } catch (err) {
        return res
            .status(500)
            .send({ Message: "Internal Server Error. Please contact with managers" });
    }
};
module.exports = {
    login,
};
