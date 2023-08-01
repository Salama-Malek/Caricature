// authors.js
const express = require('express');
const router = express.Router();
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    numberOfAuthors
} = require("../../controllers/admin_contollers/authors.controller");
const upload = require('../../middleware/multer');

router.get('/authors', getAllAuthors);
router.get('/author/:id', getAuthorById);
router.get('/count/author', numberOfAuthors);
router.post('/author', upload.single("image"), createAuthor);
router.put('/author/:id', upload.single("image"), updateAuthor);
router.delete('/author/:id', deleteAuthor);

module.exports = router;
