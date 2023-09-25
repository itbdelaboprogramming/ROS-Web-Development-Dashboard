const mongoose = require('mongoose')

const Schema = mongoose.Schema
const mapSchema = new Schema({
  _id: String,
  name: String,
  pgm: String,
  yaml: String
})

module.exports = mongoose.model('mycollection',mapSchema)
