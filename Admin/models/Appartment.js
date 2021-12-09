const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppartmentsSchema = new Schema({
    appartmentName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    appartmentType:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerCNIC: {
        type: String,
        required: true
    },
    ownerContact: {
        type: String,
        required: true
    },
    loginEmail: {
        type: String,
        required: true
    },
    loginPassword: {
        type: String,
        required: true
    },
    availibilityStatus: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Appartments', AppartmentsSchema);