const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

router.get('/playlists', (req, res, next) => {
  Playlist
    .findAll()
    .then(playlists => {
      res.send({ playlists })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

router.put('/playlists/:id', (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return company.update(req.body).then(playlist => res.send(playlist))
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router