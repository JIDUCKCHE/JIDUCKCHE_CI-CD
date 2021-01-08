const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/key')
const saltRounds = config.saltRounds;
const jwt = require('jsonwebtoken');
const moment = require('moment');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    level: {
        type: Number,
        default: 1,
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    authCode: {
        type: Number,
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword) {
    let isMatch = null
    let err = null
    try{
        isMatch = bcrypt.compareSync(plainPassword, this.password)
    } catch(error) {
        err = error
    }

    return new Promise((resolve, reject) => {
        if(isMatch) resolve(isMatch)
        if(err) reject(err)
        console.log(err)
        reject(new Error("Wrong Password"))
    })
}

userSchema.methods.generateToken = function(user) {
    const token = jwt.sign({user_id: user._id.toHexString()}, 'secret', {expiresIn: "1d"})
    user.token = token;
    return user.save()
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        if(decode) {
            user.findOne({"_id":decode.user_id, "token":token}, function(err, user){
                if(err) cb(err, null);
                cb(null, user);
            })
        } else {
            cb(err, null)
        }
    })
}


const User = mongoose.model("User", userSchema);

module.exports = { User };