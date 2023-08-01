const Artist = require("../../models/artist");

const getAllArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    next(err);
  }
};

const getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    res.status(200).json(artist);
  } catch (err) {
    next(err);
  }
};

const createArtist = async (req, res, next) => {
  try {
    const newArtist = { ...req.body };
    const artist = await Artist.create(newArtist);
    if (artist) {
      return res.status(200).send(artist);
    } else {
      return res.status(200).send({ message: "Error in creating artist" });
    }
  } catch (err) {
    next(err);
  }
};

const updateArtist = async (req, res, next) => {
  const newArtist = { ...req.body };
  const artistId = req.params.id;
  const artist = await Artist.findByIdAndUpdate(artistId, newArtist, { new: true });
  try {
    if (artist) {
      return res.status(200).send({ message: "Artist updated successfully", artist: artist });
    } else {
      return res.status(200).send({ message: "Error in updating Artist" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteArtist = async (req, res, next) => {
  const artistId = req.params.id;
  const artist = await Artist.findByIdAndDelete(artistId, { new: true });
  try {
    if (artist) {
      return res.status(200).send({ message: "Artist deleted successfully", artist: artist });
    } else {
      return res.status(200).send({ message: "Error in deleting artist" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const numberOfArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find().count();
    if (artists) {
      return res.status(200).send({ message: "artists deleted successfully", artists: artists });
    } else {
      return res.status(200).send({ message: "Error in deleting artists" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  numberOfArtists
};
