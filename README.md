# Spotify API

Manage your playlists with different songs.

## Authentication

  * A user should be able to sign up by posting `email`, `password`, and `password_confirmation` to `/users`
  * A user should be able to sign in by posting to `/tokens` and get a response `{ token: "<JWT>" }`
  * A user should be able to authenticate using an `Authorization` header with a `Bearer <JWT>`

## Playlists

  * `POST /playlists`: A user should be able to create a playlist (with just a name)
  * `GET /playlists`: A user should be able to retrieve all their playlists
  * `GET /playlists/:id`: A user should be able to get a single one of their playlists, with all the songs on it (but no others).
  * `DELETE /playlists/:id`: A user may delete their playlists, and all songs on it.

## Songs

  * `POST /playlists/:id/songs`: A user should be able to add songs to their playlists. A song has:
    * A title
    * An artist (name)
    * An album (title)
  * A song can only be on one playlist.

## Authorization

All data should be scoped to the user doing the request. E.g. a user may only see their own playlists. If a resource does not
exist, or if it does not belong to the authenticated user, you return a 404. So there is no need to return a 401 if the resource
does exist, but may not be accessible by that user.

  * `PUT /playlists/:id/songs/:id`: A user should be able to change song information, even move it to another playlist.
  * `DELETE /playlists/:id/songs/:id`: A user should be able to delete songs from their playlist.
