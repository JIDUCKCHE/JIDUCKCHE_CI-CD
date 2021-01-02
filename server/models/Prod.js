const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 250,
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    entId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ent'
    },
    link: {
        type: String,
        maxlength: 250,
    },
    mainImage: {
        type: String,
        maxlength: 250,
    },
    preImage: {
        type: String,
        maxlength: 250,
    },
    mainImagePath: {
        type: String,
        maxlength: 250,
    },
    preImagePath: {
        type: String,
        maxlength: 250,
    },
    content: {
        type: String,
        maxlength: 100
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Prod = mongoose.model("Prod", prodSchema);

module.exports = { Prod };