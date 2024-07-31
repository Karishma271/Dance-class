const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Channel ID and API settings
const channelId = 'UCTtAOWmLr0e-EOTsx-gYDzA';
const VIDEOS_PER_PAGE = 10;

// Fetch videos with pagination
const fetchVideos = async (pageToken = '') => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${VIDEOS_PER_PAGE}&key=${process.env.YOUTUBE_API_KEY}&pageToken=${pageToken}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`HTTP error! Status: ${response.status}. Error details: ${errorData}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Route to render videos with pagination
router.get('/', async (req, res) => {
  const pageToken = req.query.pageToken || '';
  try {
    const data = await fetchVideos(pageToken);
    const videos = data.items;
    const totalVideos = data.pageInfo.totalResults;

    res.render('videos', {
      videos: videos,
      prevPageToken: data.prevPageToken || null,
      nextPageToken: data.nextPageToken || null,
      totalVideos: totalVideos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.render('videos', {
      videos: [],
      prevPageToken: null,
      nextPageToken: null,
      totalVideos: 0
    });
  }
});

module.exports = router;
