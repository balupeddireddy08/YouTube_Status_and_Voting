import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';
import { videoService } from '../services/videoService';

const Admin = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    expectedReleaseDate: ''
  });

  // Progress step definitions
  const PROGRESS_STEPS = [
    { id: 'resource', name: 'Resource Gathering' },
    { id: 'content', name: 'Developing Content' },
    { id: 'recording', name: 'Video Recording' },
    { id: 'editing', name: 'Video Editing' },
    { id: 'finalizing', name: 'Finalizing Edits' }
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    setIsLoading(true);
    try {
      const allVideos = videoService.getAllVideos();
      setVideos(allVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideo({ ...video });
  };

  const handleSaveVideo = () => {
    if (!editingVideo) return;
    
    // Update video in the video service
    const updatedVideos = videos.map(video => 
      video.id === editingVideo.id ? editingVideo : video
    );
    
    videoService.saveVideos(updatedVideos);
    setVideos(updatedVideos);
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      if (videoService.deleteVideo(id)) {
        setVideos(videos.filter(video => video.id !== id));
      }
    }
  };

  const handleProgressChange = (stepId, value) => {
    if (!editingVideo) return;
    
    const numValue = parseInt(value);
    const updatedProgress = editingVideo.progress.map(step => 
      step.id === stepId 
        ? { 
            ...step, 
            percentage: numValue, 
            completed: numValue === 100 
          } 
        : step
    );
    
    setEditingVideo({
      ...editingVideo,
      progress: updatedProgress
    });
  };

  const handleNewVideoChange = (field, value) => {
    setNewVideo({
      ...newVideo,
      [field]: value
    });
  };

  const handleAddNewVideo = () => {
    if (!newVideo.title || !newVideo.expectedReleaseDate) {
      alert('Please enter at least a title and expected release date.');
      return;
    }
    
    const addedVideo = videoService.addVideo(newVideo);
    if (addedVideo) {
      setVideos([...videos, addedVideo]);
      setNewVideo({
        title: '',
        description: '',
        expectedReleaseDate: ''
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Dashboard</h1>
        
        {/* Add New Video */}
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={newVideo.title}
                onChange={(e) => handleNewVideoChange('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Release Date</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={newVideo.expectedReleaseDate}
                onChange={(e) => handleNewVideoChange('expectedReleaseDate', e.target.value)}
                placeholder="e.g., June 15, 2024"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={newVideo.description}
                onChange={(e) => handleNewVideoChange('description', e.target.value)}
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddNewVideo}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Video
            </button>
          </div>
        </div>
        
        {/* Video List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Manage Videos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expected Release</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {videos.map(video => (
                  <tr key={video.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{video.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{video.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {video.expectedReleaseDate}
                    </td>
                    <td className="px-6 py-4">
                      {editingVideo && editingVideo.id === video.id ? (
                        <div className="space-y-2">
                          {PROGRESS_STEPS.map(step => {
                            const videoStep = editingVideo.progress.find(s => s.id === step.id);
                            return (
                              <div key={step.id} className="flex items-center">
                                <span className="text-xs w-24 text-gray-500 dark:text-gray-400">{step.name}</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="10"
                                  value={videoStep?.percentage || 0}
                                  onChange={(e) => handleProgressChange(step.id, e.target.value)}
                                  className="mx-2 flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-xs w-8 text-gray-500 dark:text-gray-400">{videoStep?.percentage || 0}%</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ 
                              width: `${(video.progress.reduce((acc, step) => acc + step.percentage, 0) / 5)}%` 
                            }}
                          ></div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingVideo && editingVideo.id === video.id ? (
                        <button
                          onClick={handleSaveVideo}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          <FaSave size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditVideo(video)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FaEdit size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 