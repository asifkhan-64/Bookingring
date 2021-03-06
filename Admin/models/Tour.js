const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ToursSchema = new Schema({
    tourType: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    fromPlace: {
        type: String,
        required: true
    },
    toPlace: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    stayHotel: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    nights: {
        type: String,
        required: true
    },
    availableSeats: {
        type: String,
        required: true
    },
    chargesPerHead: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tours', ToursSchema);
