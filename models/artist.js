// artist.js
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: `http://localhost:5000/assets/upload/default-image.jpg`
    // required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    defualt: false
  }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
