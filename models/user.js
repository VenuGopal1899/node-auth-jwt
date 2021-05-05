const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema(
    {
        firstName : { type: String, required: true},
        middleName : { type: String },
        lastName : { type: String },
        email : { type: String, required: true, unique: true},
        ign : { type: String, required: true, unique: true},
        password : { type: String, required: true}
    },
    { collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;