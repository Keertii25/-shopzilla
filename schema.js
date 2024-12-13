const Joi=require('joi');
// module.exports.listingSchema=joi.object({
//     listing: joi.object().required({
//         title: joi.string().required(),
//         description: joi.string().required(),
//         location: joi.string().required(),
//         country:joi.string().required(),
//         price:  joi.number().required().min(0),
//         image: joi.string().allow("",null)
        
//     }).required()


// });

// module.exports.listingSchema = joi.object({
//     title: joi.string().required(),
//     description: joi.string().required(),
//     location: joi.string().required(),
//     country: joi.string().required(),
//     price: joi.number().required().min(0),
//     image: joi.string().allow("", null)
// });
module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()

    }).required()

})



