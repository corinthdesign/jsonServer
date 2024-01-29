  // Set up your API key and YouTube channel ID
  const API_KEY = 'AIzaSyCHS4L8HmcPQYwOcGFZrWAqlUrBQKt7b3E';
  const CHANNEL_ID = 'UC5dIymK_x_NSNdqE7P5FETQ';

  // Create a YouTube API client
  function onYouTubeApiLoad() {
    gapi.client.load('youtube', 'v3', onApiLoad);
  }

  function onApiLoad() {
    if (gapi.client && gapi.client.youtube) {
      getUpcomingStreams(CHANNEL_ID)
        .then(upcomingStreams => {
          if (upcomingStreams && upcomingStreams.length > 0) {
            const originalUrl = 'https://youtube.com/live/XArss6ebXjY';
            const newUrl = replaceVideoId(originalUrl, upcomingStreams[0]);
  
            // Embed the YouTube player with the new URL
            const playerDiv = document.getElementById('player');
            playerDiv.innerHTML = '<iframe width="560" height="315" src="' + newUrl + '" frameborder="0" allowfullscreen></iframe>';
  
            console.log('Updated URL:', newUrl);
          } else {
            console.log('No upcoming streams found.');
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    } else {
      console.error('YouTube API client not initialized.');
    }
  }

  async function getUpcomingStreams(channelId) {
    try {
      const response = await gapi.client.youtube.search.list({
        part: 'id',
        channelId: channelId,
        eventType: 'upcoming',
        type: 'video',
      });

      const upcomingStreams = response?.result?.items?.map(item => item.id.videoId) || [];
      return upcomingStreams;
    } catch (error) {
      throw new Error('Failed to fetch upcoming streams: ' + error.message);
    }
  }

  function replaceVideoId(url, newVideoId) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('v', newVideoId);
    return urlObj.toString();
  }
