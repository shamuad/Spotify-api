const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')

const Song = sequelize.define('songs', {
    title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
    },
    artist_name: {
        type: Sequelize.STRING,
        field: 'artist_name',
        allowNull: false
    },
    album_title: {
        type: Sequelize.STRING,
        field: 'album_title',
        allowNull: false
    },
    playlistId: {
        type: Sequelize.INTEGER,
        field: 'playlist_id'
    }
}, {
        timestamps: false,
        tableName: 'songs'
    })

Song.belongsTo(Playlist)

module.exports = Song