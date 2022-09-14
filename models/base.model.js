const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: String,
    username: String,
    pass: String,
    token_activate: String,
    token_restore: String,
    token_login: String,
    status: { type: Boolean, default: false }
})

module.exports = model('users', schema);