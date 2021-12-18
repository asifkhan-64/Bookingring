const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UpdatesSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Updates', UpdatesSchema);