const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    title:{
        type: String,
        maxlength: 250,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mainImage: {
        type: String,
        maxlength: 250,
    },
    mainImagePath: {
        type: String,
        maxlength: 250,
    },
    content: {
        type: String,
        maxlength: 1000
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

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = { Notice };