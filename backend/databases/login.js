const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    mobile : String,
    role: String,
    password: String
})

module.exports = mongoose.model('logins',Users)  