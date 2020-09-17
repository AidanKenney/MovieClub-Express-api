// require express
const express = require('express')

const passport = require('passport')

// require Mongoose model of collectionSchema
const Collection = require('../models/collection')

// require customErrors to detect when to throw error
const customErrors = require('../../lib/custom_errors')

// handle404 for when non-existent doc is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX (working)
router.get('/collections', requireToken, (req, res, next) => {
  Collection.find()
    .populate('owner')
    .then(collections => {
      // map an array of collections as POJOs
      return collections.map(collection => collection.toObject())
    })
    // respond with status 200 and the JSON of collections
    .then(collections => res.status(200).json({ collections }))
    // if error, handle it
    .catch(next)
})

// SHOW (working)
router.get('/collections/:id', requireToken, (req, res, next) => {
  console.log(req)

  Collection.findById(req.params.id)
    .then(handle404)
    .then(collection => res.status(200).json({ collection: collection.toObject() }))
    .catch(next)
})

// CREATE (working)
router.post('/collections', requireToken, (req, res, next) => {
  // set owner of new collection to be current user
  req.body.collection.owner = req.user.id
  Collection.create(req.body.collection)
    .then(collection => {
      res.status(201).json({ collection: collection.toObject() })
    })
})

// UPDATE (working, and do not need all fields filled)
router.patch('/collections/:id', requireToken, removeBlanks, (req, res, next) => {
  // if client tries to change 'owner' property, don't let them!
  delete req.body.collection.owner
  // find collection by ID
  Collection.findById(req.params.id)
    // if collection doesn't exist, throw error
    .then(handle404)
    // requireOwnership of collection (ID of req sender = collection.owner.id)
    .then(collection => {
      requireOwnership(req, collection)
      // update collection with new request
      return collection.updateOne(req.body.collection)
    })
    // send stateus 204 No Content
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY (working)
router.delete('/collections/:id', requireToken, (req, res, next) => {
  Collection.findById(req.params.id)
    .then(handle404)
    .then(collection => {
      requireOwnership(req, collection)
      collection.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
