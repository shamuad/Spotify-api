const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

// `POST /playlists/:id/songs`: A user should be able to add songs to their playlists. 
// A song has:
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

//BONUS

// PUT /playlists/:id/songs/:id A user should be able to change song information, 
// even move it to another playlist.
router.put('/playlists/:id/songs/:songId', (req, res, next) => {
    const playlistId = req.params.id;
    const songId = req.params.songId;

    Playlist
        .findById(playlistId)
        .then(playlist => {
            if (!playlist) {
                return res.status(500).send({
                    message: `Playlist does not exist`
                })
            }
            Song.findOne({
                where: {
                    playlistId: playlistId,
                    id: songId
                }
            })
                .then(song => {
                    if (!song) {
                        return res.status(503).send({ message: 'There is no such song' })
                    }
                    song
                        .update(req.body)
                        .then(updatedSong => res.send(updatedSong))
                })
                .catch(error => next(error));
        })
        .catch(error => next(error))
})

// `DELETE /playlists/:id/songs/:id`: A user should be able to delete 
// songs from their playlist.
router.put('/playlists/:id/songs/:songId', (req, res, next) => {
    const playlistId = req.params.id;
    const songId = req.params.songId;

    Playlist
        .findById(playlistId)
        .then(playlist => {
            if (!playlist) {
                return res.status(500).send({
                    message: `Playlist does not exist`
                })
            }
            Song.findOne({
                where: {
                    playlistId: playlistId,
                    id: songId
                }
            })
                .then(song => {
                    if (!song) {
                        return res.status(503).send({ message: 'There is no such song' })
                    }
                    song
                        .update(req.body)
                        .then(updatedSong => res.send(updatedSong))
                })
                .catch(error => next(error));
        })
        .catch(error => next(error))
})



//  Deal with this code later
// router.get('/artists', (req, res, next) => {
//     Song.findAll({
//       attributes: [
//         Sequelize.fn('DISTINCT', Sequelize.col('artist')),
//         'artist',
//         'title'
//       ],
//       order: ['artist']
//     }).then(artist => res.send(artist));
//   });



module.exports = router