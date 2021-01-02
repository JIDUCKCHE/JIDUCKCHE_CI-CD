const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prodId: {
        type: Schema.Types.ObjectId,
        ref: 'Prod'
    },
    noticeId: {
        type: Schema.Types.ObjectId,
        ref: 'Notice'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    content: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    modified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment }