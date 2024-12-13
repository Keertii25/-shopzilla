const User=require("../models/user");

module.exports.showsignup=(req, res) => {
    res.render("./users/signup.ejs");
}
module.exports.postsignup=async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            req.flash("error", "All fields are required.");
            return res.redirect("/signup");
        }
        const newUser = new User({username,email});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Listing!");
            res.redirect("/listing");
        })

       
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}
module.exports.showlogin=(req,res)=>{
    res.render("./users/login.ejs");

}
module.exports.postlogin= async(req,res)=>{
    req.flash("success","welcome to the listing");
    let redirectUrl=res.locals.redirect||"/listing";
    res.redirect(redirectUrl);
}
module.exports.getlogout=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listing");
    })
}
