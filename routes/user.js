const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware")
const userController = require("../controllers/users")


router.get("/signup",userController.renderSignup)

router.post("/signup", userController.signUp)

router.get("/login",userController.rederLogin)

router.post("/login" , saveRedirectUrl , passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}) , userController.login)

router.get("/logout", userController.logout)


module.exports = router;