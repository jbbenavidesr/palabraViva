module.exports = {
  /**
   * Returns the episode id from the url in order to use in the embed code.
   *
   * @param {String} spotifyUrl The link in question
   * @returns {String}          The id of the episode
   */
  getSpotifyID(spotifyUrl) {
    return spotifyUrl
      .replace("https://open.spotify.com/episode/", "")
      .split("?")[0];
  },
};
