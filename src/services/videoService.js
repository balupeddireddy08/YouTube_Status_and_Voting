// Sample data - this would eventually come from an API or database
// 
// IMPORTANT: To update the video data manually, modify this array and redeploy.
// For GitHub Pages deployment, modify this array with your video updates
// and commit the changes to your repository.
const videoData = [
  {
    id: 1,
    title: "Playlist Introduction: FastAPI for AI Projects",
    description: "Explaining the FastAPI framework and it's features, and how to use it for AI projects with simple examples.",
    expectedReleaseDate: "August 1, 2025",
    thumbnail: null,
    progress: [
      { id: 'researching', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'scripting', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 100 },
      { id: 'editing', completed: false, percentage: 100 },
      { id: 'thumbnail', completed: false, percentage: 0 },
      { id: 'publishing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 2,
    title: "FastAPI Introduction",
    description: "Explaining the FastAPI basics, with the help of simple coffee shop example.",
    expectedReleaseDate: "August 8, 2025",
    thumbnail: null,
    progress: [
      { id: 'researching', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'scripting', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 100 },
      { id: 'editing', completed: false, percentage: 100 },
      { id: 'thumbnail', completed: false, percentage: 0 },
      { id: 'publishing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 3,
    title: "Understanding Type Hints with a Bookstore API",
    description: "We'll explore one of the most powerful features of modern Python: Type Hints. We'll learn what they are, and how FastAPI uses them to make building APIs easier and more reliable.",
    expectedReleaseDate: "August 15, 2025",
    thumbnail: null,
    progress: [
      { id: 'researching', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'scripting', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 100 },
      { id: 'editing', completed: false, percentage: 100 },
      { id: 'thumbnail', completed: false, percentage: 0 },
      { id: 'publishing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 4,
    title: "Pydantic Data Validation using Recipe Master Example",
    description: "This video introduces Pydantic, a powerful Python library that makes sure the data you're working with is always correct and in the right format. We'll use it to validate the data in our Recipe Master API.",
    expectedReleaseDate: "August 22, 2025",
    thumbnail: null,
    progress: [
      { id: 'researching', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'scripting', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 100 },
      { id: 'editing', completed: false, percentage: 100 },
      { id: 'thumbnail', completed: false, percentage: 0 },
      { id: 'publishing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 5,
    title: "FastAPI routing and path parameters",
    description: "This video explains how to use FastAPI routing and path parameters to define routes, and organize your API effectively.",
    expectedReleaseDate: "August 29, 2025",
    thumbnail: null,
    progress: [
      { id: 'researching', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'scripting', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 0 },
      { id: 'editing', completed: false, percentage: 0 },
      { id: 'thumbnail', completed: false, percentage: 0 },
      { id: 'publishing', completed: false, percentage: 0 }
    ]
  }
];

// Local storage key for saving video data
const STORAGE_KEY = 'youtube_videos_progress';

// Get all videos
const getAllVideos = () => {
  try {
    // Check if we have data in local storage
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    
    // If no local storage data, use the default data and save it
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videoData));
    return videoData;
  } catch (error) {
    console.error('Error getting videos:', error);
    return videoData; // Fallback to default data
  }
};

// Save videos to local storage
const saveVideos = (videos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    return true;
  } catch (error) {
    console.error('Error saving videos:', error);
    return false;
  }
};

// Get a single video by ID
const getVideoById = (id) => {
  const videos = getAllVideos();
  return videos.find(video => video.id === id) || null;
};

// Update a video's progress
const updateVideoProgress = (id, stepId, progress) => {
  const videos = getAllVideos();
  const videoIndex = videos.findIndex(v => v.id === id);
  
  if (videoIndex === -1) return false;
  
  const video = videos[videoIndex];
  const stepIndex = video.progress.findIndex(s => s.id === stepId);
  
  if (stepIndex === -1) return false;
  
  // Update progress for the specific step
  videos[videoIndex].progress[stepIndex] = {
    ...video.progress[stepIndex],
    percentage: progress,
    completed: progress === 100
  };
  
  // If this step is completed and it's not the last step, start the next step
  if (progress === 100 && stepIndex < video.progress.length - 1) {
    videos[videoIndex].progress[stepIndex + 1].percentage = 0;
  }
  
  return saveVideos(videos);
};

export const videoService = {
  getAllVideos,
  getVideoById,
  updateVideoProgress
}; 