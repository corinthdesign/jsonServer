  // Set up your API key and YouTube channel ID
  const API_KEY = 'AIzaSyCHS4L8HmcPQYwOcGFZrWAqlUrBQKt7b3E';
  const CHANNEL_ID = 'UC5dIymK_x_NSNdqE7P5FETQ';

  // Create a YouTube API client
  function onYouTubeApiLoad() {
    gapi.client.load('youtube', 'v3', onApiLoad);
  }

  function onApiLoad() {
    if (gapi.client && gapi.client.youtube) {
      getUpcomingStreamVideoId(CHANNEL_ID)
        .then(upcomingStreamVideoId => {
          if (upcomingStreamVideoId) {
            const originalUrl = 'https://youtube.com/live/VIDEO_ID';
            const newUrl = originalUrl.replace('VIDEO_ID', upcomingStreamVideoId);
  
            // Embed the YouTube player with the new URL
            const playerDiv = document.getElementById('player');
            playerDiv.innerHTML = '<iframe width="560" height="315" src="' + newUrl + '" frameborder="0" allowfullscreen></iframe>';
  
            console.log('Updated URL:', newUrl);
          } else {
            console.log('No upcoming livestream found.');
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    } else {
      console.error('YouTube API client not initialized.');
    }
  }

  async function getUpcomingStreamVideoId(channelId) {
    try {
      const response = await gapi.client.youtube.search.list({
        part: 'id',
        channelId: channelId,
        eventType: 'upcoming',
        type: 'video',
      });

      const upcomingStreamVideoId = response?.result?.items?.[0]?.id?.videoId;
      return upcomingStreamVideoId;
    } catch (error) {
      throw new Error('Failed to fetch upcoming stream video ID: ' + error.message);
    }
  }
