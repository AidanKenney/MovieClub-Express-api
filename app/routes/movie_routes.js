// require express
const express = require('express')

const passport = require('passport')

// require Mongoose model of collectionSchema
const Collection = require('../models/collection')

// const Movie = require('./../models/movie')

// require customErrors to detect when to throw error
const customErrors = require('../../lib/custom_errors')

// handle404 for when non-existent doc is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

const requireOwnershipBool = customErrors.requireOwnershipBool

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/movies', requireToken, (req, res, next) => {
  // store incoming request's movie data
  const movieData = req.body.movie
  // extract the the collection we want to add the movie to
  const collectionId = movieData.collectionId

  Collection.findById(collectionId)
    .then(handle404)
    .then(collection => {
      // push movieData into property "movies" (blank array) on the collection
      collection.movies.push(movieData)
      return collection.save()
    })
    .then(collection => res.status(201).json({ collection }))
})

module.exports = router
