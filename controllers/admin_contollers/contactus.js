const contactModel = require('../../models/contactus');

const getAllContacts = async (req, res, next) => {
    try {
        const contact = await contactModel.find();
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactModel.findById(id);
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

const createContact = async (req, res, next) => {
    try {
        const newContact = { ...req.body };

        const contact = await contactModel.create(newContact);
        if (contact) {
            return res.status(200).send(contact);
        } else {
            return res.status(200).send({ message: "error" });
        }
    } catch (err) {
        next(err);
    }
}

// const updateContact = async (req, res, next) => {
//     const newContact = { ...req.body };
//     const contactId = req.params.id;
//     const user = await User.findByIdAndUpdate(userId, newContact, { new: true });
//     try {
//         if (user) {
//             return res.status(200).send({ message: "user updated successfully", user: user });
//         } else {
//             return res.status(200).send({ message: "Error in updating user" });
//         }
//     } catch (err) {
//         return res.status(500).send({ message: "Internal Server Error" });
//     }
// }

const deleteContact = async (req, res, next) => {
    const contactId = req.params.id;
    const contact = await contactModel.findByIdAndDelete(contactId, { new: true });
    try {
        if (contact) {
            return res.status(200).send({ message: "contact deleted successfully", contact: contact });
        } else {
            return res.status(200).send({ message: "error" });
        }
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    // updateUser,
    deleteContact
};
