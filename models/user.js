'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongoUri = process.env.NODE_ENV == 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/Strvdb'

const userSchema = mongoose.Schema({
    email: String,
    hashed_password: String,
    token: String,
    created_at: String
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);

module.exports = mongoose.model('user', userSchema);
