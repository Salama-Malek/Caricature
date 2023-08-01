const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const { register } = require("../../controllers/registeration/register");
const { login } = require("../../controllers/registeration/login");
const { getAllArtists, getArtistById } = require("../../controllers/admin_contollers/artists.controller");
const { getAuthorById, getAllAuthors } = require("../../controllers/admin_contollers/authors.controller");
const { getAllCaricatures, getCaricatureById, getCaricatureByCharacterId } = require("../../controllers/admin_contollers/caricatures.controller");
const { getAllCharacters, getCharactersByAuthorOrArtist } = require("../../controllers/admin_contollers/characters.controller");
const { contactUs } = require("../../controllers/contactus/contactus");
const loginMiddleware = require("../../middleware/login_middleware");
const { createFavouriteCaricature, profile } = require("../../controllers/favourite_caricature/create_favourite_caricature");

//=============Register==========================================
router.post("/register", upload.single("image"), register);

//=============Login===========================================
router.post("/login", login);

/****GET ALL ARTIST AND GET ONE BY ID****/
router.get('/artists', getAllArtists);
router.get('/artist/:id', getArtistById);

/*****************************************/

/****GET ALL AUTHORS AND GET ONE BY ID****/
router.get('/authors', getAllAuthors);
router.get('/author/:id', getAuthorById);

/*****************************************/


/****GET ALL CARICATURE AND GET ONE BY ID****/
router.get('/caricatures', getAllCaricatures);
router.get('/caricatures/character/:id', getCaricatureByCharacterId);
router.get('/caricature/:id', getCaricatureById);

/*****************************************/


/****GET ALL CHARACTARES AND GET ONE BY ID****/
router.get('/characters', getAllCharacters);
router.get('/character/:id', getCharactersByAuthorOrArtist);

/*****************************************/


/****GET ALL CHARACTARES AND GET ONE BY ID****/
router.get('/contact', contactUs);

/*****************************************/


/****Add favourite caricature****/
router.post('/caricature/:caricatureid/userid/:id', loginMiddleware, createFavouriteCaricature);

/*****************************************/


/****GET ALL FAVOURITE BY USER ID****/
router.get('/profile/:id', profile);

/*****************************************/



module.exports = router;



