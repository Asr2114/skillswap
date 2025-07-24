const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false
    },
    teachSkills: {
        type: [String],
        default: []
    },
    learnSkills: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("User", userSchema);