const Character = require('../../models/character');

const getAllCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find().populate('author').populate('artist');
    res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
};

const getCharactersByAuthorOrArtist = async (req, res, next) => {
  try {
    const { id, type } = req.params;

    let query;
    if (type === 'artist') {
      query = { artist: id };
    } else if (type === 'author') {
      query = { author: id };
    }

    const characters = await Character.find(query);
    res.status(200).json(characters);
  } catch (err) {
    next(err);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const newCharacter = { ...req.body };
    const character = await Character.create(newCharacter);

    if (character) {
      return res.status(200).send(character);
    } else {
      return res.status(200).send({ message: "Error in creating character" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const updateCharacter = async (req, res, next) => {
  const newCharacter = { ...req.body };
  const characterId = req.params.id;
  const character = await Character.findByIdAndUpdate(characterId, newCharacter, { new: true });
  try {
    if (character) {

      return res.status(200).send({ message: "character updated successfully", character: character });
    } else {
      return res.status(200).send({ message: "Error in updating character" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const deleteCharacter = async (req, res, next) => {
  const characterId = req.params.id;
  const character = await Character.findByIdAndDelete(characterId, { new: true });
  try {
    if (character) {
      return res.status(200).send({ message: "character deleted successfully", character: character });
    } else {
      return res.status(200).send({ message: "Error in deleting character" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const getNumberOfCharacterByAuthorId = async (req, res, next) => {
  const authorId = req.params.id;


  try {
    const characters = await Character.find({ author: authorId }).count();

    if (characters != null) {
      return res.status(200).send({ count: characters });
    } else {
      return res.status(200).send({ message: "Error in retrieving characters" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const getNumberOfCharacterByArtistId = async (req, res, next) => {
  const artistId = req.params.id

  try {
    const characters = await Character.find({ artist: artistId }).count();
    if (characters != null) {
      return res.status(200).send({ count: characters });
    } else {
      return res.status(200).send({ message: "Error in retrieving characters" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const lastCharacter = async (req, res, next) => {
  try {
    const lastChar = await Character.find().sort({ _id: -1 }).limit(1);
    if (lastChar != null) {
      return res.status(200).send(lastChar);
    } else {
      return res.status(200).send({ message: "Error in retrieving last Character" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}



module.exports = {
  getAllCharacters,
  getCharactersByAuthorOrArtist,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  lastCharacter,
  getNumberOfCharacterByAuthorId,
  getNumberOfCharacterByArtistId
};
