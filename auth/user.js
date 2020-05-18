'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required : true,
        minlength: 4
    },
    email: {
        type:String,
        required:true,
        trim: true,
        minlength:6,
        unique:true,
        validate : {
        validator: validator.isEmail,
        message:'{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required : true,
        minlength: 6
    },
    accountCreatedDate: {
        type: Date,
        required: false
    },
    token: {
        type: String,
        required: false
    }
});


UserSchema.methods.generateTestUser = function () {
    var user = this;
    var test = "";
    let access = 'auth';
    user.accountCreatedDate = new Date();
    let iss = new Date();
    user.token = jwt.sign({ _id: user._id.toHexString(),email:user.email,access,iss}, "test_jwt_key").toString()
    return user.save().then((acg) => {  
        if(!acg) {
            return Promise.reject({errmsg: "unable to generate user"});
        } else {
            return Promise.resolve("user generated"); 
        }
    });
}

UserSchema.pre('save' , function(next) {
    var user = this;
    if(user.isModified('name')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.name,salt, (err, hash) => {
                user.name = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.pre('save' , function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password,salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.findByCredentials = function (email, password) {
    return  User.findOne({email}).then((user) => {
        if(user){
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password,(err, res) => {
                    if(res) {
                        resolve(user.token);
                    } else {
                        reject("unable to process user info")
                    }
                });
            });
        }
    });
}


const User = mongoose.model('User', UserSchema);

  module.exports = {User};