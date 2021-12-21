const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleCategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('VehicleCategory', vehicleCategorySchema);