var express = require("express");
var router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "" });
});

router.get("/artist-search", function (req, res, next) {
  const { artistName } = req.query;

  spotifyApi
    .searchArtists(artistName)
    .then((data) => {
      console.log("The received data from the API:", data.body.artists.items);
      let results = data.body.artists;

      res.render("searchResults.hbs", results);
    })

    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

module.exports = router;
