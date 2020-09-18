const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove fields when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      // delete user._id
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
