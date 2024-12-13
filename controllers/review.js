const Listing = require("../models/listing.js");
const Expresserror=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
module.exports.postreview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author=req.user._id;
    console.log(review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect(`/listing/${listing._id}`);
}
module.exports.deletereview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
};