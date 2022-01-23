const mongoose = require("mongoose")

const paintSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, 
    color: String,
    producer: String,
    type: String,
    capacity: Number,
    density: Number,
})

module.exports = mongoose.model("Paint", paintSchema)