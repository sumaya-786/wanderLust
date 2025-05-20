const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});//initialize


router
.route("/")
.get(wrapAsync(listingController.index))//index route
.post(
    // validateListing,
    isLoggedIn,upload.single("listing[image][url]"),
    wrapAsync(listingController.createListing)//create route
);

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))//show route
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)//update route
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));//delete route


//edit route
router.get("/:id/edit"
    ,isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports=router;