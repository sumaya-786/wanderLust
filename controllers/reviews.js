const Listing=require("../models/listing");
const Review =require("../models/reviews.js");


module.exports.createReview=async (req, res) => {
        let newReview = new Review(req.body.review);
        const listing = await Listing.findById(req.params.id);
        newReview.author=req.user._id;
        listing.reviews.push(newReview);  
        await newReview.save();
        await listing.save();
        req.flash("success","new review created");
    
        res.redirect(`/listings/${listing._id}`);
    };


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","new review deleted");

    res.redirect(`/listings/${id}`);
};