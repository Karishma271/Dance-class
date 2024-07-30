const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const channelId = 'UCTtAOWmLr0e-EOTsx-gYDzA';
const VIDEOS_PER_PAGE = 10;

const fetchAllVideos = async () => {
  const allVideos = [];
  let pageToken = '';
  let hasMorePages = true;

  while (hasMorePages) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${VIDEOS_PER_PAGE}&key=${process.env.YOUTUBE_API_KEY}&pageToken=${pageToken}`;

    console.log('Fetching URL:', apiUrl);
    console.log('Using API Key:', process.env.YOUTUBE_API_KEY);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`HTTP error! Status: ${response.status}. Error details: ${errorData}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      allVideos.push(...data.items);

      pageToken = data.nextPageToken || '';
      hasMorePages = !!data.nextPageToken;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  return allVideos;
};

router.get('/', async (req, res) => {
  console.log('Accessed /videos route');
  const page = parseInt(req.query.page, 10) || 1;
  const videosPerPage = 10;

  try {
    const allVideos = await fetchAllVideos();
    const totalVideos = allVideos.length;
    const totalPages = Math.ceil(totalVideos / videosPerPage);

    const startIdx = (page - 1) * videosPerPage;
    const endIdx = Math.min(startIdx + videosPerPage, totalVideos);

    const videos = allVideos.slice(startIdx, endIdx);

    res.render('videos', {
      videos: videos,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.render('videos', {
      videos: [],
      page: page,
      totalPages: 0,
    });
  }
});

// Temporary test route
router.get('/test', (req, res) => {
  console.log('Accessed /videos/test route');
  res.send('Test route works!');
});

module.exports = router;
