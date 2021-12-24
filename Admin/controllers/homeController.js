const {delImg, delMultImages} = require('../util/file')
const Areas = require('../models/Location')
const Tours = require('../models/Tour')
const Hotels = require('../models/Hotel')
const Appartments = require('../models/Appartment')
const Rooms = require('../models/Room')
const Vehicles = require('../models/Vehicles')
const sliderGallery = require('../models/sliderGallery')
const Users = require('../models/User')
const Updates = require('../models/Updates')
const vehicleCategory = require('../models/vehicleCategory')

// Login
const login = (req, res, next) => {
    res.render('./login')
}

// Dashboard
const indexView = (req, res, next) => {
    res.render('./pages/Home/home');
}

// Areas
const addArea = (req, res, next) => {
    res.render('./pages/Areas/addAreas');
}

const listAreas = (req, res, next) => {
    Areas.find()
        .then(areas => {
            res.render('./pages/Areas/areaList', {
                areas: areas,
                pageTitle: 'Areas List',
                path: '/Areas/area-list'
            });
        })
        .catch(err => console.log(err));
}

const editArea = (req, res, next) => {

    const areaId = req.params.id;
    Areas.findById(areaId)
        .then(area => {
            if (!area) {
                return res.render('./pages/Errors/error', { desc: 'The recored does\'t exist' });
            }
            res.render('./pages/Areas/editArea', {
                pageTitle: 'Edit Area',
                path: '/admin/edit-area',
                area: area
            });
        })
        .catch(err => res.render('./pages/Errors/error'));
}


const postAddArea = (req, res, next) => {
    const name = req.body.areaName;
    const area = new Areas({
        name: name
    });
    area
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Area');
            res.redirect('/Areas/addAreas');
        })
        .catch(err => {
            console.log(err);
        });
};

const postEditArea = (req, res, next) => {
    const areaId = req.body.areaId;
    const updatedName = req.body.areaName;
    Areas.findById(areaId)
        .then(area => {
            area.name = updatedName;
            return area.save();
        })
        .then(result => {
            console.log('UPDATED Area!');
            res.redirect('/Areas/areaList');
        })
        .catch(err => console.log(err));
};

const postDeleteArea = (req, res) => {
    const areaId = req.body.id;
    console.log(areaId)
    Areas.findByIdAndDelete(areaId)
        .then(() => {
            console.log('Deleted area');
            res.sendStatus(200);
        })
        .catch(err => res.sendStatus(204));
}


// Customers
const customersList = (req, res, next) => {
    res.render('./pages/Customers/customer')
}

const editMembership = (req, res, next) => {
    res.render('./pages/Customers/editMembership')
}

const viewCustomer = (req, res, next) => {
    res.render('./pages/Customers/viewCustomer')
}

// Hotels Clients
const hotelClients = (req, res, next) => {
    Areas.find()
        .then(areas => {
            res.render('./pages/Hotels/addHotel', {
                areas: areas,
                pageTitle: 'add hotel',
                path: '/Hotels/add-hotel'
            });
        })
        .catch(err => console.log(err));
}


const hotelList = (req, res, next) => {
    Hotels.find()
        .then(hotels => {
            res.render('./pages/Hotels/hotelsList', {
                hotels: hotels,
                pageTitle: 'Hotels List',
                path: '/Hotels/hotels-list'
            });
        })
        .catch(err => console.log(err));
}

const viewHotel = (req, res, next) => {
    const hotelId = req.params.id;
    Hotels.findById(hotelId)
        .then(hotel => {
            res.render('./pages/Hotels/viewHotel', {
                hotel: hotel,
                pageTitle: 'Hotels List',
                path: '/Hotels/hotel-view'
            });
        })
        .catch(err => console.log(err));
}

const editHotel = (req, res, next) => {

    const hotelId = req.params.id;
    Hotels.findById(hotelId)
        .then(hotel => {
            if (!hotel) {
                return res.redirect('/');
            }
            return Areas.find().then(areas => {
                return { hotel: hotel, areas: areas }
            })
        }).
        then(data => {
            res.render('./pages/Hotels/editHotel', {
                pageTitle: 'Edit Tour',
                path: '/admin/edit-tour',
                data: data
            });
        })
        .catch(err => console.log(err));

}

const hotelApproved = (req, res, next) => {
    Hotels.find({ approvedStatus: true })
        .then(hotels => {
            if (!hotels) {
                redirect('/')
            }
            res.render('./pages/Hotels/approvedHotels', {
                hotels: hotels,
                pageTitle: 'Approved Hotels',
                path: '/Hotels/approved-hotels'
            });
        })
        .catch(err => console.log(err));
}

const hotelUnapproved = (req, res, next) => {
    Hotels.find({ approvedStatus: false })
        .then(hotels => {
            if (!hotels) {
                redirect('/')
            }
            res.render('./pages/Hotels/unapprovedHotels', {
                hotels: hotels,
                pageTitle: 'Approved Hotels',
                path: '/Hotels/approved-hotels'
            });
        })
        .catch(err => console.log(err));
}

const addGalleryHotel = (req, res, next) => {

    Hotels.find()
        .then(hotels => {
            if (!hotels) {
                res.redirect('/')
            }
            res.render('./pages/Hotels/addHotelGallery', {
                hotels: hotels,
                pageTitle: 'Add Gallery',
                path: '/Hotels/add-gallery'
            });
        })
        .catch(err => console.log(err));

}

const addHotelImages = (req, res, next) => {
    const hotelId = req.query.hotelId;
    res.render('./pages/Hotels/addHotelImages', { hotelId: hotelId })
}

const galleryList = (req, res, next) => {

    Hotels.find()
        .then(hotels => {
            if (!hotels) {
                res.redirect('/')
            }
            res.render('./pages/Hotels/galleryList', {
                hotels: hotels,
                pageTitle: 'Gallery List',
                path: '/Hotels/gallery-list'
            });
        })
        .catch(err => console.log(err));

}

const viewHotelImages = (req, res, next) => {

    const hotelId = req.params.id;
    Hotels.findById(hotelId)
        .then(hotel => {
            if (!hotel) {
                res.redirect('/')
            }
            res.render('./pages/Hotels/viewHotelImages', {
                hotelId: hotel.id,
                gallery: hotel.gallery,
                pageTitle: 'Gallery List',
                path: '/Hotels/gallery-list'
            });
        })
        .catch(err => console.log(err));
}

const postAddHotel = (req, res, next) => {
    const name = req.body.hotelName;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const roomService = req.body.roomService;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    // const approvedStatus = req.body.status;
    const hotel = new Hotels({
        name: name,
        contact: contact,
        parking: parking,
        area: area,
        roomService: roomService,
        address: address,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        approvedStatus: false
    });
    hotel
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Hotel');
            res.redirect('/Hotels/hotelsList');
        })
        .catch(err => {
            console.log(err);
        });
};

const postEditHotel = (req, res, next) => {

    const hotelId = req.body.hotelId;
    const name = req.body.hotelName;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    const approvedStatus = req.body.status;

    Hotels.findById(hotelId)
        .then(hotel => {
            hotel.hotelName = name,
                hotel.contact = contact,
                hotel.parking = parking,
                hotel.area = area,
                hotel.address = address,
                hotel.ownerName = ownerName,
                hotel.ownerCNIC = ownerCNIC,
                hotel.ownerContact = ownerContact,
                hotel.loginEmail = loginEmail,
                hotel.loginPassword = loginPassword,
                hotel.approvedStatus = approvedStatus
            return hotel.save();
        })
        .then(result => {
            console.log('UPDATED Hotel!');
            res.redirect('/Hotels/hotelsList');
        })
        .catch(err => console.log(err));

}

const postAddHotelGallery = async (req, res, next) => {

    const uploads = req.files;
    const hotelId = req.body.hotelId;
    const gallery = [];

    for (let i = 0; i < uploads.length; i++) {
        gallery.push(uploads[i].filename)
    }

    try {
        const hotel = await Hotels.findById(hotelId);
        if (hotel.gallery.length === 0) {
            hotel.gallery = gallery;
            hotel.save();
            console.log('added gallery to hotel')
            res.redirect('/Hotels/viewHotelImages/' + hotelId)
        } else {
            updatedGallery = hotel.gallery.concat(gallery)
            hotel.gallery = updatedGallery;
            hotel.save();
            console.log("gallery updated");
            res.redirect('/Hotels/viewHotelImages/' + hotelId)
        }
    } catch (err) {
        console.log(err);
    }

}

const postDeleteHotel = async (req, res) => {

    const hotelId = req.body.id;
    try {
        const hotel = await Hotels.findById(hotelId);
        const gallery = hotel.gallery;
        await Hotels.findByIdAndDelete(hotelId);
        delMultImages(gallery);
        res.sendStatus(200)
        console.log("hotel deleted");
    } catch (err) {
        console.log(err);
        res.sendStatus(204);
    }

};


const postDeleteGalleryImage = async (req, res) => {

    const image = req.body.image;
    const hotelId = req.body.id;
    
    try {
        const hotel = await Hotels.findById(hotelId);
        gallery = hotel.gallery;
        //removing the selected image from array
        gallery.splice(gallery.indexOf(image), 1);
        hotel.gallery = gallery;
        await hotel.save();
        delImg(image)
        console.log("UPDATED Gallery!");
        res.sendStatus(200)
    }
    catch (err) {
        console.log(err);
        res.sendStatus(204)
    }
};


// Appartments / Houses
const appartmentsHouses = (req, res, next) => {
    Areas.find()
        .then(areas => {
            res.render('./pages/Appartments/addAppartment', {
                areas: areas,
                pageTitle: 'add appartment',
                path: '/Appartments/add-appartment'
            });
        })
        .catch(err => console.log(err));
}

const appartmentHouseList = (req, res, next) => {
    Appartments.find()
        .then(appartments => {
            res.render('./pages/Appartments/appartmentHouseList', {
                appartments: appartments,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const editAppartmentHouse = (req, res, next) => {
    const appartId = req.params.id;
    Appartments.findById(appartId)
        .then(appart => {
            if (!appart) {
                return res.redirect('/');
            }
            return Areas.find().then(areas => {
                return { appart: appart, areas: areas }
            })
        }).
        then(data => {
            res.render('./pages/Appartments/editAppartmentHouse', {
                pageTitle: 'Edit Appartment/House',
                path: '/Appartment/edit-Appartment',
                data: data
            });
        })
        .catch(err => console.log(err));
}

const addGallery = (req, res, next) => {
    const appartId = req.params.id;
    res.render('./pages/Appartments/addGalleryAppartments', { appartId: appartId })
}

const editGalleryAppartments = (req, res, next) => {

    const appartId = req.params.id;
    Appartments.findById(appartId)
        .then(appartment => {
            if (!appartment) {
                res.redirect('/Appartments/addGallery/' + appartId)
            } else {
                res.render('./pages/Appartments/editGalleryAppartments', {
                    gallery: appartment.gallery,
                    appartmentId: appartment.id,
                    pageTitle: 'Gallery List',
                    path: '/Hotels/gallery-list'
                });
            }

        })
        .catch(err => console.log(err));

}

const appartmentList = (req, res, next) => {
    Appartments.find({ appartmentType: 'appartment' })
        .then(appartments => {
            res.render('./pages/Appartments/appartmentList', {
                aparts: appartments,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const housesList = (req, res, next) => {
    Appartments.find({ appartmentType: 'house' })
        .then(houses => {
            res.render('./pages/Appartments/housesList', {
                houses: houses,
                pageTitle: 'Appartments List',
                path: '/Appartments/appartment-list'
            });
        })
        .catch(err => console.log(err));
}

const addGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/addGalleryHouses')
}

const editGalleryHouses = (req, res, next) => {
    res.render('./pages/Appartments/editGalleryHouses')
}

const postAddAppartment = (req, res, next) => {
    const name = req.body.appartName;
    const price = req.body.price;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const appartType = req.body.appartType;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    // const approvedStatus = req.body.status;
    const appartment = new Appartments({
        name: name,
        contact: contact,
        price: price,
        contact: contact,
        parking: parking,
        area: area,
        appartmentType: appartType,
        address: address,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        availibilityStatus: false
    });
    appartment
        .save()
        .then(result => {
            // console.log(result);
            console.log('appartment added');
            res.redirect('/Appartments/appartmentHouseList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditAppartment = (req, res, next) => {

    const appartId = req.body.appartId;
    const name = req.body.appartName;
    const price = req.body.price;
    const contact = req.body.contact;
    const parking = req.body.parking;
    const area = req.body.area;
    const appartType = req.body.appartType;
    const address = req.body.address;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    const availibilityStatus = req.body.status;

    Appartments.findById(appartId)
        .then(appart => {
            appart.name = name;
            appart.price = price;
            appart.contact = contact;
            appart.parking = parking;
            appart.area = area;
            appart.appartmentType = appartType;
            appart.address = address;
            appart.ownerName = ownerName;
            appart.ownerCNIC = ownerCNIC;
            appart.ownerContact = ownerContact;
            appart.loginEmail = loginEmail;
            appart.loginPassword = loginPassword;
            appart.availibilityStatus = availibilityStatus;
            return appart.save();
        })
        .then(result => {
            console.log('UPDATED appartment/house!');
            res.redirect('/Appartments/appartmentHouseList');
        })
        .catch(err => console.log(err));

}

const postDeleteAppartment = async (req, res) => {

    const appartId = req.body.id;
    try {
        const appartment = await Appartments.findById(appartId);
        const gallery = appartment.gallery;
        await Appartments.findByIdAndDelete(appartId);
        delMultImages(gallery);
        res.sendStatus(200)
        console.log("appartment deleted");
    } catch (err) {
        console.log(err);
        res.sendStatus(204);
    }
}

const postAddAppartmentGallery = async (req, res, next) => {
    const uploads = req.files;
    const appartId = req.body.appartId;
    const gallery = [];

    for (let i = 0; i < uploads.length; i++) {
        gallery.push(uploads[i].filename)
    }

    try {
        const appartment = await Appartments.findById(appartId);
        if (appartment.gallery.length === 0) {
            appartment.gallery = gallery;
            appartment.save();
            console.log('added gallery to appartment')
            res.redirect('/Appartments/editGallery/' + appartId)
        } else {
            updatedGallery = appartment.gallery.concat(gallery)
            appartment.gallery = updatedGallery;
            appartment.save();
            console.log("gallery updated");
            res.redirect('/Appartments/editGallery/' + appartId)
        }
    } catch (err) {
        console.log(err);
    }

}

const postDeleteAppartmentGalleryImage = (req, res) => {
    //recieve the gallery id and the image name
    const image = req.body.image;
    const appartId = req.body.appartId;

    Appartments
        .findById(appartId)
        .then(appartment => {
            gallery = appartment.gallery;
            //removing the selected image from array
            gallery.splice(gallery.indexOf(image), 1);
            appartment.gallery = gallery;
            return appartment.save();
        })
        .then((result) => {
            delImg(image)
            console.log("UPDATED Gallery!");
            res.redirect("/Appartments/editGallery/" + appartId);
        })
        .catch((err) => console.log(err));
};

// Rooms
const addRoom = (req, res, next) => {
    Areas.find()
        .then(areas => {
            if (!areas) {
                console.log('no area found')
                return res.redirect('/');
            }
            return Hotels.find().then(hotels => {
                if (!hotels) {
                    console.log('no hotels found')
                }
                return { areas: areas, hotels: hotels }
            })
        }).
        then(data => {
            res.render('./pages/Rooms/addRoom', {
                pageTitle: 'Rooms',
                path: '/Rooms/add-room',
                data: data
            });
        })
        .catch(err => console.log(err));
}

const roomList = (req, res, next) => {
    Rooms.find()
        .then(rooms => {
            res.render('./pages/Rooms/roomList', {
                rooms: rooms,
                pageTitle: 'Room List',
                path: '/Rooms/room-list'
            });
        })
        .catch(err => console.log(err));
}

const editRoom = async (req, res, next) => {

    const id = req.params.id;
    const areas = await Areas.find();
    const hotels = await Hotels.find();

    if (areas && hotels) {
        Rooms.findById(id)
            .then(room => {
                if (!room) {
                    console.log('no room found')
                    return res.redirect('/');
                }
                res.render('./pages/Rooms/editRoom', {
                    areas: areas,
                    hotels: hotels,
                    room: room
                })

            })
            .catch(err => console.log(err));
    } else {
        console.log('something went wrong')
    }
}

const addRoomGallery = (req, res, next) => {
    const roomId = req.params.id;
    res.render('./pages/Rooms/addRoomGallery', { roomId: roomId })
}

const editRoomGallery = (req, res, next) => {
    const roomId = req.params.id;
    Rooms.findById(roomId)
        .then(room => {
            if (room.gallery.length === 0) {
                res.redirect('/Rooms/addGallery/' + roomId)
            } else {
                res.render('./pages/Rooms/editRoomGallery', {
                    gallery: room.gallery,
                    roomId: room.id,
                    pageTitle: 'Gallery List',
                    path: '/Rooms/gallery-list'
                });
            }
        })
        .catch(err => console.log(err));
}

const postAddRoom = (req, res) => {
    const roomNo = req.body.roomNo;
    const hotel = JSON.parse(req.body.hotel);
    const area = JSON.parse(req.body.area);
    const beds = req.body.beds;
    const hotWater = req.body.hotWater;
    const balcony = req.body.balcony;
    const status = req.body.status;
    const location = req.body.location;
    const charges = req.body.charges;
    const size = req.body.size;
    const occupency = req.body.occupency;
    const bedSize = req.body.bedSize;

    const room = new Rooms({
        roomNo: roomNo,
        hotelId: hotel.hotelId,
        hotelName: hotel.hotelName,
        areaId: area.areaId,
        areaName: area.areaName,
        beds: beds,
        hotWater: hotWater,
        balcony: balcony,
        status: status,
        location: location,
        charges: charges,
        size: size,
        occupency: occupency,
        bedSize: bedSize
    });

    room
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Room');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });

}

const postEditRoom = (req, res) => {

    const roomId = req.body.roomId;
    const roomNo = req.body.roomNo;
    const hotel = JSON.parse(req.body.hotel);
    const area = JSON.parse(req.body.area);
    const beds = req.body.beds;
    const hotWater = req.body.hotWater;
    const balcony = req.body.balcony;
    const status = req.body.status;
    const location = req.body.location;
    const charges = req.body.charges;
    const size = req.body.size;
    const occupency = req.body.occupency;
    const bedSize = req.body.bedSize;

    Rooms.findById(roomId)
        .then(room => {
            room.roomNo = roomNo;
            room.hotelId = hotel.hotelId;
            room.hotelName = hotel.hotelName;
            room.areaId = area.areaId;
            room.areaName = area.areaName;
            room.beds = beds;
            room.hotWater = hotWater;
            room.balcony = balcony;
            room.status = status;
            room.location = location;
            room.charges = charges;
            room.size = size;
            room.occupency = occupency;
            room.bedSize = bedSize;

            return room.save()
        })
        .then(result => {
            console.log('room updated');
            res.redirect('/Rooms/roomList')
        })
        .catch(err => {
            console.log(err);
        });

}

const postDeleteRoom = async (req, res) => {

    const roomId = req.body.id;
    try {
        const room = await Rooms.findById(roomId);
        const gallery = room.gallery;
        await Rooms.findByIdAndDelete(roomId);
        delMultImages(gallery);
        res.sendStatus(200)
        console.log("room deleted");
    } catch (err) {
        console.log(err);
        res.sendStatus(204);
    }

};

const postAddRoomGallery = async (req, res) => {
    
    const uploads = req.files;
    const roomId = req.body.roomId;
    const gallery = [];

    for (let i = 0; i < uploads.length; i++) {
        gallery.push(uploads[i].filename)
    }

    try {
        const room = await Rooms.findById(roomId);
        if (room.gallery.length === 0) {
            room.gallery = gallery;
            room.save();
            console.log('added gallery to room')
            res.redirect('/Rooms/editGallery/' + roomId)
        } else {
            updatedGallery = room.gallery.concat(gallery)
            room.gallery = updatedGallery;
            room.save();
            console.log("gallery updated");
            res.redirect('/Rooms/editGallery/' + roomId)
        }
    } catch (err) {
        console.log(err);
    }
}

const postDeleteRoomGalleryImage = (req, res) => {

    const roomId = req.body.roomId;
    const image = req.body.image;

    Rooms
        .findById(roomId)
        .then(room => {
            gallery = room.gallery;
            //removing the selected image from array
            gallery.splice(gallery.indexOf(image), 1);
            room.gallery = gallery;
            return room.save();
        })
        .then((result) => {
            delImg(image)
            console.log("UPDATED Gallery!");
            res.redirect("/Rooms/editGallery/" + roomId);
        })
        .catch((err) => console.log(err));
};

// Vehicle Category (New Data)
const addCategory = (req, res, next) => {
    res.render('./pages/VehiclesCategory/addCategory')
}

const categoryList = (req, res, next) => {
    vehicleCategory.find()
        .then(cats => {
            if (!cats) {
                res.redirect('/')
            } else {
                res.render('./pages/VehiclesCategory/categoryList', {
                    cats: cats,
                    pageTitle: 'list category',
                    path: '/VehiclesCategory/category-list'
                });
            }

        })
        .catch(err => console.log(err));
}

const editCategory = (req, res, next) => {
    const catId = req.params.id;
    vehicleCategory.findById(catId)
        .then(cat => {
            if (!cat) {
                res.redirect('/')
            } else {
                res.render('./pages/VehiclesCategory/editCategory', {
                    cat: cat,
                    pageTitle: 'edit category',
                    path: '/VehiclesCategory/vehicleCategory'
                });
            }

        })
        .catch(err => console.log(err));
}

const postAddVehicleCategory = (req, res) =>{
    const name = req.body.name;
    const vehicleCat = new vehicleCategory({
        name: name
    });
    vehicleCat
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added category');
            res.redirect('/VehiclesCategory/addCategory');
        })
        .catch(err => {
            console.log(err);
        });
    
}

const postEditVehicleCategory = (req, res) =>{
    const catId = req.body.id;
    const name = req.body.name;
    vehicleCategory.findById(catId)
        .then(cat => {
            cat.name = name;
            return cat.save()
        })
        .then(result => {
            console.log('cat updated');
            res.redirect('/VehiclesCategory/categoryList')
        })
        .catch(err => {
            console.log(err);
        });
}

// Vehicle
const addVehicle = (req, res, next) => {
    vehicleCategory.find()
        .then(cats => {
            if (!cats) {
                console.log('could\'t find categories');
                res.redirect('/VehiclesCategory/addCategory')
            } else {
                res.render('./pages/Vehicles/addVehicles', {
                    cats: cats,
                    pageTitle: 'list category',
                    path: '/VehiclesCategory/category-list'
                });
            }

        })
        .catch(err => console.log(err));
}

const vehicleList = (req, res, next) => {
    Vehicles.find()
        .then(vehicles => {
            res.render('./pages/Vehicles/vehicleList', {
                vehicles: vehicles,
                pageTitle: 'Vehicle List',
                path: '/Vehicles/vehicles-list'
            });
        })
        .catch(err => console.log(err));
}


const editVehicle = (req, res, next) => {
    const id = req.params.id;

    Vehicles.findById(id)
        .then(vehicle => {
            if (!vehicle) {
                console.log('no vehicle found')
                return res.redirect('/');
            }

            return vehicleCategory.find().then(cats => {
                return {
                    cats: cats,
                    vehicle: vehicle
                }
            })

        })
        .then(data => {
            res.render('./pages/Vehicles/editVehicle', {
                data: data
            })
        })
        .catch(err => console.log(err));

}

const addVehicleGallery = (req, res, next) => {
    const vehicleId = req.params.id;
    res.render('./pages/Vehicles/addVehicleGallery', { vehicleId: vehicleId })
}

const editVehicleGallery = (req, res, next) => {

    const vehicleId = req.params.id;
    Vehicles.findById(vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                res.redirect('/Vehicles/addVehicleGallery/' + vehicleId)
            } else {
                res.render('./pages/Vehicles/editVehicleGallery', {
                    gallery: vehicle.gallery,
                    vehicleId: vehicle.id,
                    pageTitle: 'Gallery List',
                    path: '/Vehicle/gallery-list'
                });
            }
        })
        .catch(err => console.log(err));

}

const postAddVehicle = (req, res) => {
    const category = JSON.parse(req.body.category);
    const vehicleNo = req.body.vehicleNo;
    const model = req.body.model;
    const seats = req.body.seats;
    const status = req.body.status;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const ownerAddress = req.body.ownerAddress;

    const vehicle = new Vehicles({
        categoryId: category.id,
        categoryName: category.name,
        vehicleNo: vehicleNo,
        model: model,
        seats: seats,
        availabilityStatus: status,
        ownerName: ownerName,
        ownerCNIC: ownerCNIC,
        ownerContact: ownerContact,
        ownerAddress: ownerAddress
    });
    vehicle
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added vehicle');
            res.redirect('/Vehicles/vehicleList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditVehicle = (req, res) => {
    const id = req.body.id;
    const category = JSON.parse(req.body.category);
    const vehicleNo = req.body.vehicleNo;
    const model = req.body.model;
    const seats = req.body.seats;
    const status = req.body.status;
    const ownerName = req.body.ownerName;
    const ownerCNIC = req.body.ownerCNIC;
    const ownerContact = req.body.ownerContact;
    const ownerAddress = req.body.ownerAddress;

    Vehicles.findById(id)
        .then(vehicle => {
            vehicle.categoryId = category.id;
            vehicle.categoryName = category.name;
            vehicle.vehicleNo = vehicleNo;
            vehicle.model = model;
            vehicle.seats = seats;
            vehicle.availabilityStatus = status;
            vehicle.ownerName = ownerName;
            vehicle.ownerCNIC = ownerCNIC;
            vehicle.ownerContact = ownerContact;
            vehicle.ownerAddress = ownerAddress;
            return vehicle.save()
        })
        .then(result => {
            console.log('Updated vehicle');
            res.redirect('/Vehicles/vehicleList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postDeleteVehicle = async (req, res) => {

    const vehicleId = req.body.id;
    try {
        const vehicle = await Vehicles.findById(vehicleId);
        const gallery = vehicle.gallery;
        await Vehicles.findByIdAndDelete(vehicleId);
        delMultImages(gallery);
        res.sendStatus(200)
        console.log("vehicle deleted");
    } catch (err) {
        console.log(err);
        res.sendStatus(204);
    }
}

const postAddVehicleGallery = async (req, res) => {
    const uploads = req.files;
    const vehicleId = req.body.vehicleId;
    const gallery = [];

    for (let i = 0; i < uploads.length; i++) {
        gallery.push(uploads[i].filename)
    }

    try {
        const vehicle = await Vehicles.findById(vehicleId);
        if (vehicle.gallery.length === 0) {
            vehicle.gallery = gallery;
            vehicle.save();
            console.log('added gallery to vehicle')
            res.redirect('/Vehicles/editVehicleGallery/' + vehicleId)
        } else {
            updatedGallery = vehicle.gallery.concat(gallery)
            vehicle.gallery = updatedGallery;
            vehicle.save();
            console.log("gallery updated");
            res.redirect('/Vehicles/editVehicleGallery/' + vehicleId)
        }
    } catch (err) {
        console.log(err);
    }
}

const postDeleteVehiclesGalleryImage = (req, res) => {

    const image = req.body.image;
    const vehicleId = req.body.vehicleId;
    Vehicles
        .findById(vehicleId)
        .then(vehicle => {
            gallery = vehicle.gallery;
            //removing the selected image from array
            gallery.splice(gallery.indexOf(image), 1);
            vehicle.gallery = gallery;
            return vehicle.save();
        })
        .then((result) => {
            delImg(image)
            console.log("UPDATED Gallery!");
            res.redirect("/Vehicles/editVehicleGallery/" + vehicleId);
        })
        .catch((err) => console.log(err));
};

// Updates / Blog
const addUpdates = (req, res, next) => {
    res.render('./pages/Updates/addUpdates')
}

const updateList = (req, res, next) => {
    Updates.find()
        .then(updates => {
            res.render('./pages/Updates/updateList', {
                updates: updates,
                pageTitle: 'Updates List',
                path: '/Updates/update-list'
            });
        })
        .catch(err => console.log(err));

}

const editBlog = (req, res, next) => {

    const id = req.params.id;
    Updates.findById(id)
        .then(update => {
            if (!update) {
                console.log('no update found')
                return res.redirect('/');
            }
            res.render('./pages/Updates/editUpdate', {
                update: update
            })

        })
        .catch(err => console.log(err));

}

const deleteBlog = (req, res, next) => {
    res.render('./pages/Updates/deleteBlog')
}

const postAddUpdate = (req, res) => {
    const heading = req.body.heading;
    const author = req.body.author;
    const date = new Date()
    const desc = req.body.desc;

    const uploads = req.files;
    const media = uploads[0].filename;

    // for (let i = 0; i < uploads.length; i++) {
    //     media.push(uploads[i].filename)
    // }

    const update = new Updates({
        heading: heading,
        author: author,
        date: date,
        media: media,
        description: desc
    });

    update
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added update');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditUpdate = (req, res) => {
    const id = req.body.id;
    const heading = req.body.heading;
    const author = req.body.author;
    const date = new Date()
    const oldImage = req.body.oldImage;
    let media;
    const desc = req.body.desc;

    const uploads = req.files;
    if(uploads.length === 0){
        media = oldImage;
    } else {
        delImg(oldImage)
        media = uploads[0].filename;
    }
   
    Updates.findById(id)
        .then(update => {
            update.heading = heading;
            update.author = author;
            update.date = date;
            update.media = media;
            update.description = desc;
            return update.save()
        })
        .then(result => {
            console.log('Updated updates');
            res.redirect('/Updates/updateList');
        })
        .catch(err => {
            console.log(err);
        });
}

const postDeleteUpdate = async (req, res) => {

    const updateId = req.body.id;
    try {
        const update = await Updates.findById(updateId);
        await Updates.findByIdAndDelete(updateId);
        const mediaFile = update.media;
        delImg(mediaFile)
        console.log('update deleted')
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(204)
    }

}

// Tours Plans & Hiking
const addTour = async (req, res, next) => {
    
    try {
        const hotels = await Hotels.find();
        const areas = await Areas.find();
        res.render('./pages/Tours/addTours', {
            areas: areas,
            hotels: hotels,
            pageTitle: 'Add tour',
            path: '/Tours/tour-list'
        });
    } catch (err) {
        console.log(err)
    }

}

const tourList = (req, res, next) => {
    Tours.find()
        .then(tours => {
            res.render('./pages/Tours/toursList', {
                tours: tours,
                pageTitle: 'Tours List',
                path: '/Tours/tour-list'
            });
        })
        .catch(err => console.log(err));
}

const viewTour = (req, res, next) => {

    const tourId = req.params.id;
    Tours.findById(tourId)
        .then(tour => {
            if (!tour) {
                return res.redirect('/');
            }
            res.render('./pages/Tours/viewTour', {
                pageTitle: 'View Tour',
                path: '/tours/tour',
                tour: tour
            });
        })
        .catch(err => console.log(err));
}

const editTour = async (req, res, next) => {

    try {
        const areas = await Areas.find();
        const hotels = await Hotels.find();
        const tourId = req.params.id;
        Tours.findById(tourId)
            .then(tour => {
                res.render('./pages/Tours/editTour', {
                    pageTitle: 'Edit Tour',
                    path: '/admin/edit-tour',
                    tour: tour,
                    areas: areas,
                    hotels: hotels
                });
            })
    } catch (err) {
        console.log(err)
    }

}

const postAddTour = (req, res) => {

    const tourType = req.body.tourType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const fromPlace = JSON.parse(req.body.fromPlace);
    const toPlace = JSON.parse(req.body.toPlace);
    const pickupLoc = JSON.parse(req.body.pickupLoc);
    const dropoffLoc = JSON.parse(req.body.dropoffLoc);
    const stayHotel = JSON.parse(req.body.stayHotel);
    const days = req.body.days;
    const nights = req.body.nights;
    const availableSeats = req.body.seats;
    const chargesPerHead = req.body.charges;
    const description = req.body.desc;
    const tour = new Tours({
        tourType: tourType,
        startDate: startDate,
        endDate: endDate,
        fromPlace: fromPlace.areaName,
        toPlace: toPlace.areaName,
        pickupLocation: pickupLoc.areaName,
        dropoffLocation: dropoffLoc.areaName,
        stayHotel: stayHotel.hotelName,
        days: days,
        nights: nights,
        availableSeats: availableSeats,
        chargesPerHead: chargesPerHead,
        description: description
    });
    tour
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added Tour');
            res.redirect('/Tours/addTours');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditTour = (req, res, next) => {

    const tourId = req.body.tourId;
    const tourType = req.body.tourType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const fromPlace = JSON.parse(req.body.fromPlace);
    const toPlace = JSON.parse(req.body.toPlace);
    const pickupLoc = JSON.parse(req.body.pickupLoc);
    const dropoffLoc = JSON.parse(req.body.dropoffLoc);
    const stayHotel = JSON.parse(req.body.stayHotel);
    const days = req.body.days;
    const nights = req.body.nights;
    const availableSeats = req.body.seats;
    const chargesPerHead = req.body.charges;
    const description = req.body.desc;

    Tours.findById(tourId)
        .then(tour => {
            tour.tourType = tourType;
            tour.startDate = startDate;
            tour.endDate = endDate;
            tour.fromPlace = fromPlace.areaName;
            tour.toPlace = toPlace.areaName;
            tour.pickupLocation = pickupLoc.areaName;
            tour.dropoffLocation = dropoffLoc.areaName;
            tour.stayHotel = stayHotel.hotelName;
            tour.days = days;
            tour.nights = nights;
            tour.availableSeats = availableSeats;
            tour.chargesPerHead = chargesPerHead;
            tour.description = description;
            return tour.save();
        })
        .then(result => {
            console.log('UPDATED Tour!');
            res.redirect('/');
        })
        .catch(err => console.log(err));

}

const postDeleteTour = (req, res) => {

    const tourId = req.body.id;
    Tours.findByIdAndDelete(tourId)
        .then(result => {
            console.log('Tours deleted')
            res.sendStatus(200)
        })
        .catch(err => res.sendStatus(204));
}


// Bundles and Offers
const addBundle = (req, res, next) => {
    res.render('./pages/BundleOffers/addBundle')
}

const bundleList = (req, res, next) => {
    res.render('./pages/BundleOffers/bundlesList')
}

// Slider Images
const addImagesSlider = (req, res, next) => {
    const galleryId = req.params.id;
    res.render('./pages/SliderImages/addSliderImages', { galleryId: galleryId })
}

const sliderImages = (req, res, next) => {

    sliderGallery.findOne()
        .then(gallery => {
            if(!gallery){
                res.redirect('/SliderImages/addSliderImages/none')
            }
            res.render('./pages/SliderImages/sliderImagesList', { gallery: gallery })
        })
        .catch(err => console.log(err));

}

const postAddSliderImages = async (req, res) => {

    const uploads = req.files;
    const galleryId = req.body.galleryId;
    const sliderImages = [];

    for (let i = 0; i < uploads.length; i++) {
        sliderImages.push(uploads[i].filename)
    }

    const filter = { id: galleryId };
    const update = { $push: { images: sliderImages } };

    const existingGallery = await sliderGallery.findOneAndUpdate(filter, update, {
        new: true
    });
    if (existingGallery) {
        console.log('the gallery updated')
        res.redirect('/SliderImages/sliderImagesList')
    } else {
        const gallery = new sliderGallery({
            images: sliderImages
        })
        gallery
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Gallery');
                res.redirect('/');
            })
            .catch(err => {
                console.log(err)
            });
    }
}

const postDeleteSliderGalleryImage = (req, res) => {

    const galleryId = req.body.galleryId;
    const image = req.body.image;
    let images = [];
    sliderGallery
        .findById(galleryId)
        .then((gallery) => {
            images = gallery.images;
            images.splice(images.indexOf(image), 1);
            if (images.length === 0) {
                return sliderGallery.findByIdAndDelete(galleryId)
            } else {
                return gallery.save();
            }
        })
        .then((result) => {
            delImg(image)
            console.log("UPDATED Slider Gallery!");
            if (images.length === 0) {
                res.redirect('/')
            } else {
                res.redirect("/SliderImages/sliderImagesList");
            }
        })
        .catch((err) => console.log(err));
};


// Customer Feedback
const feedback = (req, res, next) => {
    res.render('./pages/Feedback/customerFeedback')
}

const viewFeedbackQuery = (req, res, next) => {
    res.render('./pages/Feedback/viewFeedbackQuery')
}

// Users
const addUser = (req, res, next) => {
    Areas.find()
    .then( areas => {
        res.render('./pages/Users/addUser', {
            areas: areas
        })
    })
    .catch(err => console.log(err))
    
}

const userList = (req, res, next) => {
    Users.find()
        .then(users => {
            res.render('./pages/Users/usersList', {
                users: users,
                pageTitle: 'Users List',
                path: '/Users/users-list'
            });
        })
        .catch(err => console.log(err));
}

const editUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const areas = await Areas.find();
        const user = await Users.findById(userId);
        res.render('./pages/Users/editUser', {
            user: user,
            areas: areas,
            pageTitle: 'Edit User',
            path: '/Users/edit-user'
        });
    } catch (err) {
        console.log(err)
    }

}

const postAddUser = (req, res) => {

    const name = req.body.name;
    const contact = req.body.contact;
    const cnic = req.body.cnic;
    const gender = req.body.gender;
    const location = JSON.parse(req.body.location);
    const address = req.body.address;
    const type = req.body.type;
    const email = req.body.email;
    const password = req.body.password;

    const user = new Users({
        name: name,
        contact: contact,
        CNIC: cnic,
        gender: gender,
        location: location.name,
        address: address,
        type: type,
        email: email,
        password: password
    });

    user
        .save()
        .then(result => {
            // console.log(result);
            console.log('Added user');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

const postEditUser = (req, res) => {

    const userId = req.body.userId;
    const name = req.body.name;
    const contact = req.body.contact;
    const cnic = req.body.cnic;
    const gender = req.body.gender;
    const location = JSON.parse(req.body.location);
    const address = req.body.address;
    const type = req.body.type;
    const email = req.body.email;
    const password = req.body.password;
    
    Users.findById(userId)
        .then(user => {
            user.name = name;
            user.contact = contact;
            user.CNIC = cnic;
            user.gender = gender;
            user.location = location.areaName;
            user.address = address;
            user.type = type;
            user.email = email;
            user.password = password;
            return user.save();
        })
        .then(result => {
            console.log('UPDATED User!');
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

const postDeleteUser = (req, res) =>{
    const userId = req.body.id;
    Users.findByIdAndDelete(userId)
        .then(() => {
            console.log('Deleted user');
            res.sendStatus(200);
        })
        .catch(err => res.sendStatus(204));
}


module.exports = {
    // Login
    login,

    // Dashboard
    indexView,

    // Areas
    addArea, listAreas, editArea, postAddArea, postEditArea, postDeleteArea,

    // Customers
    customersList, viewCustomer, editMembership,

    // Hotels Clients
    hotelClients, hotelList, viewHotel, editHotel, hotelApproved, hotelUnapproved, addGalleryHotel, addHotelImages, galleryList, viewHotelImages, postAddHotel, postEditHotel, postAddHotelGallery, postDeleteGalleryImage, postDeleteHotel,

    // Appartments / Houses 
    appartmentsHouses, appartmentHouseList, editAppartmentHouse, appartmentList, editGalleryAppartments, housesList, addGallery, addGalleryHouses, editGalleryHouses, postAddAppartment, postEditAppartment, postAddAppartmentGallery, postDeleteAppartmentGalleryImage, postDeleteAppartment,

    // Rooms
    addRoom, roomList, editRoom, addRoomGallery, editRoomGallery, postAddRoom, postEditRoom, postAddRoomGallery, postDeleteRoomGalleryImage, postDeleteRoom,

    // Vehicle Category
    addCategory, categoryList, editCategory, postAddVehicleCategory, postEditVehicleCategory,

    // Vehicle
    addVehicle, vehicleList, editVehicle, addVehicleGallery, editVehicleGallery, postAddVehicle, postEditVehicle, postAddVehicleGallery, postDeleteVehiclesGalleryImage, postDeleteVehicle,

    // Updates / Blog
    addUpdates, updateList, editBlog, deleteBlog, postAddUpdate, postEditUpdate, postDeleteUpdate,

    // Tours Plans & Hiking
    addTour, tourList, viewTour, editTour, postAddTour, postEditTour, postDeleteTour,

    // Bundles and Offers
    addBundle, bundleList,

    // Slider Images
    addImagesSlider, sliderImages, postAddSliderImages, postDeleteSliderGalleryImage,

    // Customer Feedback
    feedback, viewFeedbackQuery,

    // Users
    addUser, userList, editUser, postAddUser, postEditUser, postDeleteUser

}