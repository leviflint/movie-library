const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    vudu: Boolean,
    itunes: Boolean,
});

module.exports = mongoose.model('Posts', PostSchema);