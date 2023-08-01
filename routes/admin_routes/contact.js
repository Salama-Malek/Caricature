// CongetAllContacts.js
const express = require("express");
const router = express.Router();
const {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact
} = require("../../controllers/admin_contollers/contactus");
// const upload = require("../../middleware/multer");

router.get('/contact', getAllContacts);
router.get('/contact/:id', getContactById);
router.post('/contact', createContact);
// router.put('/contact/:id', updateCaricature);
router.delete('/contact/:id', deleteContact);

module.exports = router;
