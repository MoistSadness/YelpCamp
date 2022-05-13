const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    author: String,
})

module.exports = mongoose.model("Review", ReviewSchema);