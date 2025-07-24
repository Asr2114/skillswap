const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const skillRoutes = require('./routes/skills');
const userRoutes = require('./routes/users');
const passport = require('passport');
require('./config/passport');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(session({
    secret: 'secretkey', resave: false, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', userRoutes);
app.use(express.urlencoded({extended: true, limit: '10mb'}));



connectDB();

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));