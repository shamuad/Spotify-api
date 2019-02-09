const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.post('/playlists/:id/songs', (req, res, next) => {
    const playlistId = req.params.id
    Playlist
        .findById(playlistId)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song.create({ ...req.body, playlistId })
                .then(song => {
                    if (!song) {
                        return res.status(404).send({
                            message: `Song does not exist`
                        })
                    }
                    return res.status(201).send(song)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

router.get('/songs', (req, res, next) => {
    //Pagination 
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    Promise.all([
        Song.count(),
        Song.findAll({ limit, offset })
    ])
        .then(([total, songs]) => {
            res.send({
                songs, total
            })
        })
        .catch(error => next(error))
})

router.get('/songs/:id', (req, res, next) => {
    Song
        .findById(req.params.id, { include: [Playlist] })
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return res.send(song)
        })
        .catch(error => next(error))
})

router.post('/songs', (req, res, next) => {
    Song
        .create(req.body)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return res.status(201).send(song)
        })
        .catch(error => next(error))
})

module.exports = router