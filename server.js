const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Port can be set by environment variables for deployment

// Serve the frontend
app.use(express.static('public'));

// YouTube API search endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        key: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching YouTube data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
