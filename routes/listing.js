const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js")
const {isLoggedIn , isOwner,validateSchema} = require("../middleware.js")
const listingcontroller = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage, limits: { fileSize: 5 * 1024 * 1024 }})



//Index Route

router.get("/" , wrapAsync(listingcontroller.index))

//new Route
router.get("/new" , isLoggedIn,listingcontroller.renderNewForm)

//create Route

router.post("/" , isLoggedIn, upload.single('listing[image]'), validateSchema, wrapAsync(listingcontroller.createForm))


//Show Route
router.get("/:id" , wrapAsync(listingcontroller.showListing))

//edit route
router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync(listingcontroller.editListing))

//update route
router.put("/:id" , isLoggedIn ,isOwner, upload.single('listing[image]'), validateSchema, wrapAsync(listingcontroller.updateListing))

//delete route

router.delete("/:id", isLoggedIn ,isOwner, wrapAsync(listingcontroller.deleteListing))


module.exports = router;