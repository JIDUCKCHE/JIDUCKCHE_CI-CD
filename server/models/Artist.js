const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    entId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ent',
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

const Artist = mongoose.model("Artist", artistSchema);

module.exports = { Artist };