const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caricatureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caricature',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
