const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
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
    react: {
        type: Boolean,
        required: true,
        default: false
    }
})

const React = mongoose.model('React', reactSchema);

module.exports = React;
