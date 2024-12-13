const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Expresserror = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const {isLoggedIn,isOwner,isreviewauthor}=require("../middleware.js");
const Listingmodels=require("../controllers/listing.js");
const Reviewcontroller=require("../controllers/review.js");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});


router
.route("/")
.get(
    WrapAsync(Listingmodels.index)
)
.post(
    isLoggedIn,upload.single("listing[image]"),
    WrapAsync(Listingmodels.postroute)

);


// New Form Route
router.get("/new",
    isLoggedIn, Listingmodels.new);

// Show Route
router
.route("/:id")
.get(
     WrapAsync(Listingmodels.showroute)
)
// Update Route
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    WrapAsync(Listingmodels.updateroute)
)
// Delete Route
.delete(
    isLoggedIn,
    isOwner,
    WrapAsync(Listingmodels.deleteroute)
);
// Edit Form Route
router.get(
    "/:id/edit",isLoggedIn,isOwner,
    WrapAsync(Listingmodels.editroute)
);
// Add Review Route
router.post(
    "/:id/reviews",isLoggedIn,
    WrapAsync(Reviewcontroller.postreview)
);

// Delete Review Route
router.delete(
    "/:id/reviews/:reviewId",
    isLoggedIn,
   isreviewauthor,
    WrapAsync(Reviewcontroller.deletereview)
);

module.exports = router;
