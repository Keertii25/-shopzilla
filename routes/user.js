const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const User = require("../models/user"); // Assuming User model is already defined.
const passport = require("passport");
const {savedRedirectUrl}=require("../middleware.js");
const Usercontroller=require("../controllers/user.js");

router
.route("/signup")
.get(Usercontroller.showsignup )
.post(
    WrapAsync(Usercontroller.postsignup)
);

router
.route("/login")
.get(Usercontroller.showlogin)
.post(
    savedRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
     failureFlash:true,
    }),
    WrapAsync(Usercontroller.postlogin)
   );


    router.get("/logout",Usercontroller.getlogout)
  

module.exports = router;
