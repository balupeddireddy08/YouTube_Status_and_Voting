// Sample data - this would eventually come from an API or database
// 
// IMPORTANT: To update the video data manually, modify this array and redeploy.
// For GitHub Pages deployment, modify this array with your video updates
// and commit the changes to your repository.
const videoData = [
  {
    id: 1,
    title: "Building a YouTube Status Website",
    description: "How to build a React app to show your audience your upcoming YouTube videos and their progress.",
    expectedReleaseDate: "May 20, 2024",
    thumbnail: null,
    progress: [
      { id: 'resource', completed: true, percentage: 100 },
      { id: 'content', completed: true, percentage: 100 },
      { id: 'recording', completed: true, percentage: 100 },
      { id: 'editing', completed: false, percentage: 70 },
      { id: 'finalizing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 2,
    title: "Creating a Custom LLM Agent with OpenAI Functions",
    description: "Learn how to build a custom agent using OpenAI's function calling capabilities.",
    expectedReleaseDate: "June 1, 2024",
    thumbnail: null,
    progress: [
      { id: 'resource', completed: true, percentage: 100 },
      { id: 'content', completed: false, percentage: 60 },
      { id: 'recording', completed: false, percentage: 0 },
      { id: 'editing', completed: false, percentage: 0 },
      { id: 'finalizing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 3,
    title: "RAG Systems with Vector Databases",
    description: "Advanced techniques for building Retrieval Augmented Generation systems.",
    expectedReleaseDate: "June 15, 2024",
    thumbnail: null,
    progress: [
      { id: 'resource', completed: true, percentage: 100 },
      { id: 'content', completed: false, percentage: 30 },
      { id: 'recording', completed: false, percentage: 0 },
      { id: 'editing', completed: false, percentage: 0 },
      { id: 'finalizing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 4,
    title: "Building AI Agents with LangGraph",
    description: "Create complex AI agent workflows using the LangGraph framework.",
    expectedReleaseDate: "July 1, 2024",
    thumbnail: null,
    progress: [
      { id: 'resource', completed: true, percentage: 80 },
      { id: 'content', completed: false, percentage: 0 },
      { id: 'recording', completed: false, percentage: 0 },
      { id: 'editing', completed: false, percentage: 0 },
      { id: 'finalizing', completed: false, percentage: 0 }
    ]
  },
  {
    id: 5,
    title: "Fine-tuning LLMs for Custom Tasks",
    description: "Learn how to fine-tune large language models for specific use cases.",
    expectedReleaseDate: "July 15, 2024",
    thumbnail: null,
    progress: [
      { id: 'resource', completed: false, percentage: 40 },
      { id: 'content', completed: false, percentage: 0 },
      { id: 'recording', completed: false, percentage: 0 },
      { id: 'editing', completed: false, percentage: 0 },
      { id: 'finalizing', completed: false, percentage: 0 }
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