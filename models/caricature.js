// caricature.js
const mongoose = require("mongoose");

const caricatureSchema = new mongoose.Schema({
  image: {
    type: String,
    default: `http://localhost:5000/assets/upload/default-image.jpg`
  },
  authorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  artistName: {
    //needs edits
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  characterName: {
    //needs edits
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  favourite: {
    type: Boolean,
    defualt: false
  }
});

const Caricature = mongoose.model("Caricature", caricatureSchema);

module.exports = Caricature;
