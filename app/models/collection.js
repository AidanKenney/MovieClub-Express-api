// require mongoose
const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    // remove desired fields when we call `.toObject`
    transform: (_doc, collection) => {
      delete collection._id
      delete collection.createdAt
      delete collection.updatedAt
      delete collection.__v
      return collection
    }
  }
})

module.exports = mongoose.model('Collection', collectionSchema)
