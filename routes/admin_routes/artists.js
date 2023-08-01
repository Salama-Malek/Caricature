// artists.js
const express = require("express");
const router = express.Router();
const {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
    numberOfArtists
} = require("../../controllers/admin_contollers/artists.controller");
const upload = require("../../middleware/multer");

router.get('/artists', getAllArtists);
router.get('/artist/:id', getArtistById);
router.get('/count/artist', numberOfArtists);
router.post('/artist', upload.single("image"), createArtist);
router.put('/artist/:id', upload.single("image"), updateArtist);
router.delete('/artist/:id', deleteArtist);

module.exports = router;
