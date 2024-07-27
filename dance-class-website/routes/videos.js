const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        channelId: 'YOUR_CHANNEL_ID',
        maxResults: 1
      }
    });
    const playlistId = response.data.items[0].id;

    const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 10
      }
    });

    const videos = videosResponse.data.items;
    res.render('videos', { title: 'Dance Videos', videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Error fetching videos');
  }
});

module.exports = router;
