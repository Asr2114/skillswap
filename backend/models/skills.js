const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    name: {type: String, required: true},
    type: {type: String, enum:['Teaching', 'Learning'], required: true},
    description: {type: String, required:true},
    experience: { type: String },

}, {timestamps:true});

module.exports = mongoose.model('Skill', skillSchema);