  // Replace 'videos.json' with the path to your JSON file
  const jsonFilePath = 'https://raw.githubusercontent.com/corinthdesign/jsonServer/main/reelsCarousel.json';

  // Function to fetch and display videos
  async function fetchAndDisplayVideos() {
    try {
      const response = await fetch(jsonFilePath);
      const data = await response.json();

      const carouselContainer = document.getElementById('carousel-container');

      // Loop through each video URL in the JSON file
      data.urls.forEach((url) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        // Detect video platform based on the URL
        if (url.includes('youtube.com')) {
          const youtubeIframe = document.createElement('iframe');
          youtubeIframe.src = url;
          youtubeIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          youtubeIframe.allowFullscreen = true;
          videoCard.appendChild(youtubeIframe);
        } else if (url.includes('instagram.com/reel/')) {
          const instagramIframe = document.createElement('iframe');
          // Use the Instagram embed URL format
          instagramIframe.src = `https://www.instagram.com/embed/v/${url.split('/reel/')[1]}/`;
          instagramIframe.allowFullscreen = true;
          videoCard.appendChild(instagramIframe);
        }

        carouselContainer.appendChild(videoCard);
      });
    } catch (error) {
      console.error('Error fetching or displaying videos:', error);
    }
  }

  // Call the function to fetch and display videos
  fetchAndDisplayVideos();