const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review")
const listingSchema=new Schema({
    title:{
        type:String ,
        required:true,
    },
    description:String,
    image:{
     url:String,
     filename:String,
    },
    reviews:[{
      type: Schema.Types.ObjectId,
      ref:"Review"

    }],
    owner:[{
      type: Schema.Types.ObjectId,
      ref:"User"
    }],
   
    price:Number,
    location:String,
    country:String
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id :{$in: listing.reviews}});
  }

})
// model for the listing Schema
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;