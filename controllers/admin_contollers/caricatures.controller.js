const Caricature = require('../../models/caricature');




const getAllCaricatures = async (req, res, next) => {
  try {
    const caricatures = await Caricature.find().populate('authorName').populate('artistName').populate('characterName');
    res.status(200).json(caricatures);
  } catch (err) {
    next(err);
  }
};

const getCaricatureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caricature = await Caricature.findById(id);
    return res.status(200).json(caricature);
  } catch (err) {
    next(err);
  }
};

const getCaricatureByCharacterId = async (req, res, next) => {
  try {
    const characterId = req.params.id;
    const caricatures = Caricature.find({ characterName: characterId });
    if (caricatures) {
      return res.status(200).send(caricatures);
    } else {
      return res.status(200).send({ message: "error" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const createCaricature = async (req, res, next) => {
  try {
    const newCaricature = { ...req.body };
    const caricature = await Caricature.create(newCaricature);

    if (caricature) {
      return res.status(200).send(caricature);
    } else {
      return res.status(200).send({ message: "Error in creating caricature" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const updateCaricature = async (req, res, next) => {
  const newCaricature = { ...req.body };
  const caricatureId = req.params.id;
  const caricature = await Caricature.findByIdAndUpdate(caricatureId, newCaricature, { new: true });
  try {
    if (caricature) {
      return res.status(200).send({ message: "Caricature updated successfully", caricature: caricature });
    } else {
      return res.status(200).send({ message: "Error in updating caricature" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}


const deleteCaricature = async (req, res, next) => {
  const caricatureId = req.params.id;
  const caricature = await Caricature.findByIdAndDelete(caricatureId, { new: true });
  try {
    if (caricature) {
      return res.status(200).send({ message: "Caricature deleted successfully", caricature: caricature });
    } else {
      return res.status(200).send({ message: "Error in deleting caricature" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}


const lastCaricature = async (req, res, next) => {
  try {
    const lastCari = await Caricature.find().sort({ _id: -1 }).limit(1);
    if (lastCari != null) {
      return res.status(200).send(lastCari);
    } else {
      return res.status(200).send({ message: "Error in retrieving last Caricature" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}


module.exports = {
  getAllCaricatures,
  getCaricatureById,
  createCaricature,
  updateCaricature,
  deleteCaricature,
  lastCaricature,
  getCaricatureByCharacterId
};
