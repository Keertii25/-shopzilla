const Listing = require("../models/listing.js");
const Expresserror=require("../utils/ExpressError.js");
module.exports.index=async (req, res) => {
    const alllisting = await Listing.find({});
    res.render("./listings/index.ejs",{alllisting});
};
module.exports.new=(req, res) => {
    res.render("./listings/new.ejs");
}
module.exports.showroute=async (req, res) => {
    const { id } = req.params;
    const data = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if (!data) {
        throw new Expresserror(404, "Listing not found");
    }
    
    res.render("./listings/show.ejs", {data});
}
module.exports.postroute=async (req, res) => { 
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    let url=req.file.path;
    let filename=req.file.filename;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success","new items added");
    res.redirect("/listing");       
};
module.exports.editroute=async (req, res) => {
    const { id } = req.params;
    const data = await Listing.findById(id);
    if (!data) {
        throw new Expresserror(404, "Listing not found");
    }
    let originalurl=data.image.url;
    originalurl.replace("/upload","/upload/h-100,w-100")
    res.render("./listings/edit.ejs", {data,originalurl});
};
module.exports.updateroute=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        new: true,
    });
    if (!listing) {
        throw new Expresserror(404, "Listing not found");
    }
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
       await listing.save();
    }
    res.redirect(`/listing/${id}`);
}
module.exports.deleteroute=async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}

