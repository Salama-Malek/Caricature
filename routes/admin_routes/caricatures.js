// caricatures.js
const express = require("express");
const router = express.Router();
const {
    getAllCaricatures,
    getCaricatureById,
    createCaricature,
    updateCaricature,
    deleteCaricature,
    lastCaricature
} = require("../../controllers/admin_contollers/caricatures.controller");
const upload = require("../../middleware/multer");

router.get('/caricatures', getAllCaricatures);
router.get('/caricature/last/one/in', lastCaricature);
router.get('/caricature/:id', getCaricatureById);
router.post('/caricature', upload.single("image"), createCaricature);
router.put('/caricature/:id', upload.single("image"), updateCaricature);
router.delete('/caricature/:id', deleteCaricature);

module.exports = router;
