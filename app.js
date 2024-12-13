if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
   
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const Expresserror=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const listingrouter=require("./routes/listing.js");
const userRouter=require("./routes/user.js");
const passport=require("passport");
const Localstrategy=require("passport-local");
const User=require("./models/user.js");
app.use(methodOverride("_method"));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/shopzilla");
}
main().then(()=>{
    console.log("connected to the dbs");
})
.catch((err)=>{
   console.log(err);
})
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

const sessionoptins={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }

}
app.use(session(sessionoptins));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{

        res.locals.successMsg = req.flash("success");  // Correctly pass the flash message
        res.locals.errorMsg = req.flash("error");
        res.locals.Currentuser=req.user || null;
        next();
  
})
app.get("/",(req,res)=>{
    res.render("./listings/home.ejs");
});
// app.get("/demouser",async (req,res)=>{
//     let fakeuser=new User({
//        email:"student@gmail.com",
//        username:"delta-student", 
//     })
//     let registeruser=await User.register(fakeuser,"helloworld");
//     res.send(registeruser);

// })
app.use("/listing",listingrouter);
app.use("/",userRouter);
app.all("*", (req, res, next) => {
    next(new Expresserror(404,"Page Not found"));
    // res.status(404).render("./layouts/error.ejs", { message: "Page Not Found" });
});

app.use((err, req, res, next) => {
    let{statusCode,message}=err;
    // console.error("Error Details:", message);
    res.status(statusCode).render("./layouts/error.ejs", { message: message || "Something went wrong!" });
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
