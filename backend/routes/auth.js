const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');

router.post("/register", async(req, res)=>{
    try{
        const{
            name, email, password
        } = req.body;

        const existing= await User.findOne({email});
        if(existing) return res.status(400).json({error: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: hashedPassword
        });
        await user.save();

        res.status(201).json({message: "User Registered Succesfully"});
    } 

    catch(err){
        res.status(500).json({error: "something wetn wrong"});
    }
});


router.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error: "User not found"});

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({error: "Invalid Credentials"});

        //jwt token
        const token = jwt.sign(
            {id: user._id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.status(200).json({
            message: "Login Succesful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                linkedin: user.linkedin,
                profilePic: user.profilePic
            }
        });
    } catch(err){
        res.status(500).json({error: "Something went wrong"});
    }
});

router.get("/google", (req, res, next) => {
    console.log("➡️ Google auth init route hit");
    next();
}, passport.authenticate("google", {
    scope: ['profile', 'email']
}));



router.get('/google/callback',
    passport.authenticate("google", {failureRedirect: '/login'}),
    (req, res)=>{
        console.log("✅ Google callback route reached", req.user);
        const user = req.user;

        const token = jwt.sign({
            id: user._id, email: user.email
        }, process.env.JWT_SECRET,{
            expiresIn: '1d'
        });

        res.redirect(`http://localhost:3000/login-success?token=${token}`);
    }
)

// Fallback 404 handler for unmatched routes (debugging)
router.use((req, res) => {
  console.log("❌ Unknown route hit:", req.originalUrl);
  res.status(404).send("Not Found");
});

module.exports = router;