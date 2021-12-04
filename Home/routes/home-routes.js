const express = require('express');

const {
    // HomePage
    home,

    // Services (Appartments)
    appartments, hotelRooms, vehicles, galleryAppRoom,

    // Tours
    tours, hike, gallerytandh,

    // News
    news,

    // About Us
    about,

    // Contact
    contact

} = require('../controllers/homeController');
const router = express.Router();

// HomePage
router.get('/', home)

// Services (Appartments)
router.get('/Appartments/appartments', appartments)
router.get('/Appartments/hotelRooms', hotelRooms)
router.get('/Appartments/vehicles', vehicles)
router.get('/Appartments/galleryAppRoom', galleryAppRoom)

// Tours
router.get('/Tours/tours', tours)
router.get('/Tours/hike', hike)
router.get('/Tours/gallerytandh', gallerytandh)

// News
router.get('/News/news', news)

// About Us
router.get('/About/about', about)

// Contact
router.get('/Contact/contact', contact)


module.exports = {
    routes: router
}