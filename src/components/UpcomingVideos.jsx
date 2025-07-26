import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaFilter, FaSortAmountDown, FaSortAmountUp, FaSearch } from 'react-icons/fa';
import UpcomingVideo from './UpcomingVideo';
import { videoService } from '../services/videoService';

const UpcomingVideos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    // Load videos when component mounts
    const loadVideos = () => {
      try {
        const allVideos = videoService.getAllVideos();
        console.log("Loaded videos:", allVideos.length); // Debug: log how many videos are loaded
        setVideos(allVideos);
        setFilteredVideos(allVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, []);

  // Calculate overall progress for a video
  const calculateProgress = (video) => {
    const totalSteps = video.progress.length;
    const completedSteps = video.progress.filter(step => step.completed).length;
    const currentStepProgress = video.progress.find(step => !step.completed)?.percentage || 0;
    
    const completedPercentage = (completedSteps / totalSteps) * 100;
    const currentStepContribution = currentStepProgress / totalSteps;
    
    return completedPercentage + currentStepContribution;
  };

  // Sort videos by progress
  const sortVideos = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    const sortedVideos = [...filteredVideos].sort((a, b) => {
      const progressA = calculateProgress(a);
      const progressB = calculateProgress(b);
      
      return newSortOrder === 'asc' 
        ? progressA - progressB 
        : progressB - progressA;
    });
    
    setFilteredVideos(sortedVideos);
  };

  // Filter videos by search term and completion status
  useEffect(() => {
    let result = [...videos];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(term) || 
        video.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by completion status
    if (filterCompleted) {
      result = result.filter(video => {
        const progress = calculateProgress(video);
        return progress < 100; // Only show incomplete videos
      });
    }
    
    setFilteredVideos(result);
  }, [searchTerm, filterCompleted, videos]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="upcoming-videos" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-2">
            <FaYoutube className="text-red-600 text-4xl mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              Upcoming Videos
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Track the progress of videos I'm currently working on and see what's coming next.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {videos.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search videos..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    {/* Filter Toggle */}
                    <button
                      onClick={() => setFilterCompleted(!filterCompleted)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        filterCompleted 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <FaFilter className="mr-2" />
                      {filterCompleted ? 'In Progress' : 'Show All'}
                    </button>
                    
                    {/* Sort Button */}
                    <button
                      onClick={sortVideos}
                      className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                    >
                      Sort by Progress
                      {sortOrder === 'asc' ? (
                        <FaSortAmountUp className="ml-2" />
                      ) : (
                        <FaSortAmountDown className="ml-2" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <UpcomingVideo key={video.id} video={video} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400 text-lg">No videos match your search criteria.</p>
                    </div>
                  )}
                </motion.div>
                
                {/* Video Statistics */}
                {!searchTerm && (
                  <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Video Statistics</h3>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Total Videos:</span> {videos.length}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Videos in Progress:</span> {videos.filter(v => calculateProgress(v) < 100).length}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Videos Ready for Publishing:</span> {videos.filter(v => calculateProgress(v) >= 100).length}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Next Release:</span> {videos.sort((a, b) => new Date(a.expectedReleaseDate) - new Date(b.expectedReleaseDate))[0]?.expectedReleaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-6">No upcoming videos at the moment.</p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-12">
          <motion.a
            href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaYoutube className="mr-2" size={20} />
            Check out my YouTube channel
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingVideos; 