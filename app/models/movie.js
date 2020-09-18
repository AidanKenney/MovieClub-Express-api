// require mongoose
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  toObject: {
    // remove desired fields when we call `.toObject`
    transform: (_doc, movie) => {
      // delete collection._id
      delete movie.createdAt
      delete movie.updatedAt
      delete movie.__v
      return movie
    }
  }
})

module.exports = movieSchema
