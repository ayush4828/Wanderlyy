const Listing = require("../models/listing")
const Review = require("../models/review")
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = async(req,res)=>{
    let  { id}  = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id
    
    listing.reviews.push(newReview);
    
   
    await listing.save();
    await newReview.save();
 req.flash("success","New Review Added !! ")
   res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, { $pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
     req.flash("success"," Review Deleted !! ")
    res.redirect(`/listings/${id}`);
}