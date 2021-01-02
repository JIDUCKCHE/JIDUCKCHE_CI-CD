const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    artistId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };