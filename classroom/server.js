const express = require('express');
const app = express();
const users=require("./routes/users");
const posts=require("./routes/posts")
const session=require("express-session");
const flash=require("connect-flash");
app.use(session({secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}));
// success is the key   and  user registered successfully is the message 
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    let {name}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
    req.flash("error","user not registered ");   
    }
    else{
        req.flash("success","user registered successfully");
    }
    
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
   res.render("page.ejs",{name:req.session.name});
})





// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// })
// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })



// Start the server
app.listen(8080, () => {
    console.log("The server has started on port 8080");
});
