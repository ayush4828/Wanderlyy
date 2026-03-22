const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
  
    if(! req.isAuthenticated() ){
 if (req.originalUrl && req.originalUrl.includes('/reviews')) {
            // Extracts whatever is before '/reviews' (which is the listing URL)
            req.session.redirectUrl = req.originalUrl.split('/reviews')[0];
        } else {
            req.session.redirectUrl = req.originalUrl;
        }
        
        req.flash("error", "you must be logged in to create new listing!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{

    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
     let {id} = req.params;
        let listingOwner = await Listing.findById(id)
        if(!listingOwner.owner.equals(res.locals.currUser._id)){
          req.flash("error","You Are Not the Owner Of this Listing")
         return res.redirect(`/listings/${id}`);
        }
        next()
}

module.exports.isReviewAuthor = async (req,res,next)=>{
   let {id,reviewId} = req.params;
        let reviewAuthor = await Review.findById(reviewId)
        if(!reviewAuthor.author.equals(res.locals.currUser._id)){
          req.flash("error","You Are Not the Author Of the Review")
         return res.redirect(`/listings/${id}`);
        }
        next()
}
module.exports.validateSchema =  (req,res,next)=>{
let {error} = listingSchema.validate(req.body);
  if(error){
    let errmsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errmsg)
  }
  else{
    next();
  }
}

module.exports.validateReview = (req,res,next)=>{
let {error} = reviewSchema.validate(req.body);

// if (!req.body.comment.trim()) {
//    throw new Error("Comment cannot be empty");
// }
  if(error){
    let errmsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errmsg)
  }
  else{
    next();
  }
}