const Listing = require("./models/listing");
const Review=require("./models/review");
module.exports.isLoggedIn=(req,res,next)=>{  
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you have to be loggedin in shopzilla");
        return res.redirect("/login");
    }
    next(); 
}
module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirect=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);  
    if(!(String(listing.owner[0])===String(res.locals.Currentuser._id))){
        req.flash("error","you are not the owner");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.isreviewauthor=async(req,res,next)=>{
    let {id}=req.params;
    let {reviewId}=req.params;
    let reviewowner=await Review.findById(reviewId); 
    if(!(String(reviewowner.author[0])===String(res.locals.Currentuser._id))){
        req.flash("error","you are did not created this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}