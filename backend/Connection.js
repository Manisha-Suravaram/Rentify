const mongoose = require('mongoose');
require('dotenv').config()

const url = `${process.env.MONGO_URL}`
const connection = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MONGODB CONNECTION ESTABLISHED")
})
module.exports = connection
