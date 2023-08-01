// character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    default: `http://localhost:5000/assets/upload/default-image.jpg`
  },
  image: {
    type: String,
    // required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    // required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    // required: true,
  },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
