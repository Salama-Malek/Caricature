// artists.js
const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/admin_contollers/users.controller");
const upload = require("../../middleware/multer");

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user', upload.single("image"), createUser);
router.put('/user/:id', upload.single("image"), updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
