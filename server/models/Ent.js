const { request } = require("express");
const mongoose = require('mongoose');

const entSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 150,
    },
    mainImage: {
        type: String,
        maxlength: 250,
    },
    mainImagePath: {
        type: String,
        maxlength: 250,
    }
}, { timestamps: true })

const Ent = mongoose.model("Ent", entSchema);

module.exports = { Ent };