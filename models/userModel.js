const mongoose = require('mongoose');

const validator = require('validator');
const { validate } = require('./tourModel');

//name email photo pass confirmPass
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'user must have name'],
            trim: true

        },

        email: {
            type: String,
            unique: true,
            required: [true, 'user must have a email'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'pls enter a valid email🤬🤬']
        },

        photo: {
            type: String
        },

        password: {
            type: String,
            required: [true, 'passwrod is necesssary '],
            minlength: 8
        },
        passwordConfirm: {
            type: String,
            required: [ture, 'pls confirm your  pass']
        }

    }
);

//now create model out of this schema

const User=mongoose.model('User',userSchema);

module.export=User;