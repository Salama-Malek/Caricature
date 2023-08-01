const Author = require('../../models/author');

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    let newAuthor = { ...req.body };
    
    let image_url;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      newAuthor = { ...req.body, image_url: image_url };
    } else {
      newAuthor = { ...req.body };
    }

    const author = await Author.create(newAuthor);
    if (author) {
      return res.status(200).send(author);
    } else {
      return res.status(200).send({ message: "Error in creating author" });
    }
  } catch (err) {
    next(err);
  }
}

const updateAuthor = async (req, res, next) => {
  const newAuthor = { ...req.body };
  const authorId = req.params.id;
  const author = await Author.findByIdAndUpdate(authorId, newAuthor, { new: true });
  try {
    if (author) {
      return res.status(200).send({ message: "Author updated successfully", author: author });
    } else {
      return res.status(200).send({ message: "Error in updating author" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.id;
  const author = await Author.findByIdAndDelete(authorId, { new: true });
  try {
    if (author) {
      return res.status(200).send({ message: "Author deleted successfully", author: author });
    } else {
      return res.status(200).send({ message: "Error in deleting author" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const numberOfAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().count();
    if (authors) {
      return res.status(200).send({ message: "authors deleted successfully", authors: authors });
    } else {
      return res.status(200).send({ message: "Error in deleting authors" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  numberOfAuthors
};
