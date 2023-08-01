const User = require('../../models/user');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        let newUser = { ...req.body };

        let image;
        if (req.file) {
            image = `${process.env.IMG_URL}/images/${req.file.filename}`;
            newUser = { ...req.body, image: image };
        } else {
            newUser = { ...req.body };
        }

        const user = await User.create(newUser);
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(200).send({ message: "Error in creating user" });
        }
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    const newUser = { ...req.body };
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, newUser, { new: true });
    try {
        if (user) {
            return res.status(200).send({ message: "user updated successfully", user: user });
        } else {
            return res.status(200).send({ message: "Error in updating user" });
        }
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId, { new: true });
    try {
        if (user) {
            return res.status(200).send({ message: "user deleted successfully", user: user });
        } else {
            return res.status(200).send({ message: "Error in deleting user" });
        }
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
