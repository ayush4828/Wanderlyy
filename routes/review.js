const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor,validateReview,validateSchema } = require("../middleware.js");
const reviewController = require("../controllers/review.js")




//Reviews Post Route


router.post("/" , isLoggedIn,validateReview  ,  wrapAsync(reviewController.createReview))


//Reviews delete Route

router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))




module.exports = router;