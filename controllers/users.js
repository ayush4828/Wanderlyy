const User = require("../models/user");

module.exports.renderSignup = (req,res)=>{
    res.render("user/signup.ejs")
}
module.exports.signUp = async (req,res,next)=>{
try{
        let {username,email,password}= req.body;
    let newuser = new User({email,username})
     let registeruser = await User.register(newuser,password)
     req.logIn(registeruser,(err)=>{
        if(err){
            return next(err)
        }
     req.flash("success","Welcome To wonderlyy !!")
     res.redirect("/listings")
     })
    //  console.log(registeruser);
 
}
catch (e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
}

module.exports.rederLogin = (req,res)=>{
    res.render("user/login.ejs")
}

module.exports.login = (req,res)=>{
   req.flash("success","Welcome Back to the Wonderlyy !!")
   let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are Logged Out !!")
        res.redirect("/listings");
    })
}