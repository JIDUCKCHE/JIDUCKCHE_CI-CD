const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prod'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true })

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like }